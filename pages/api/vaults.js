import {toAddress} from 'utils';

const	STABLE_UNDERLYING = [];
STABLE_UNDERLYING[1] = [
	'0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
	'0x57Ab1ec28D129707052df4dF418D58a2D46d5f51', // sUSD
	'0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
	'0x0000000000085d4780B73119b644AE5ecd22b376', // TUSD
	'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
	'0x5f98805A4E8be255a32880FDeC7F6728C6568bA0', // LUSD
];
STABLE_UNDERLYING[250] = [
	'0x82f0B8B456c1A451378467398982d4834b6829c1', // MIM
	'0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
	'0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // DAI
	'0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355', // FRAX
	'0x049d68029688eAbF473097a2fC38ef61633A3C7A', // fUSDT
];

async function getVaultStrategies({vaultStrategies, stratTree}) {
	const 	strategies = [];
	let		hasMissingStrategiesDescriptions = false;
	for (let i = 0; i < vaultStrategies.length; i++) {
		const	strategyAddress = toAddress(vaultStrategies[i].address);
		const	strategyName = vaultStrategies[i].name;
		const	details = stratTree[strategyAddress];
		if (details) {
			if (!details?.description) {
				hasMissingStrategiesDescriptions = true;
			}
			strategies.push({
				address: strategyAddress || '',
				name: details?.name || strategyName || '',
				description: (details?.description ? details.description : ''),
				localization: (details?.localization ? details.localization : {})
			});	
		} else {
			strategies.push({
				address: strategyAddress || '',
				name: strategyName || '',
				description: '',
				localization: {}
			});	
			hasMissingStrategiesDescriptions = true;
		}
	}
	return ([strategies, hasMissingStrategiesDescriptions]);
}

async function getStrategies({network, isCurve, isRetired, isV1, isAll, isStable, isDefi}) {
	let		allStrategiesAddr = await (await fetch(`https://meta.yearn.network/strategies/${network}/all`)).json();
	const	stratTree = {};

	for (let index = 0; index < allStrategiesAddr.length; index++) {
		const stratDetails = allStrategiesAddr[index];
		for (let jindex = 0; jindex < (stratDetails.addresses).length; jindex++) {
			const address = stratDetails.addresses[jindex];
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name,
				localization: stratDetails.localization
			};
		}
	}

	let	vaults = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	if (isRetired) {
		vaults = vaults.filter(e => e?.migration?.available === true);
	} else if (isV1) {
		vaults = vaults.filter(e => e.type === 'v1' && !e.special);
		vaults = vaults.filter(e => !e.migration || e.migration.available === false);
	} else {
		vaults = vaults.filter(e => e.type === 'v2');
		if (isAll) {
			// 
		} else if (isStable) {
			vaults = vaults.filter(e => STABLE_UNDERLYING[network].includes(e.token?.address));
		} else if (isDefi) {
			vaults = vaults.filter(e => e.apy?.type !== 'crv');
			vaults = vaults.filter(e => !e.name.includes('yvCurve'));
			vaults = vaults.filter(e => !STABLE_UNDERLYING[network].includes(e.token?.address));
		} else if (isCurve) {
			vaults = vaults.filter(e => e.apy?.type === 'crv' || e.name.includes('yvCurve'));
		} else {
			vaults = vaults.filter(e => e.apy?.type !== 'crv');
			vaults = vaults.filter(e => !e.name.includes('yvCurve'));
		}
		vaults = vaults.filter(e => !e.migration || e.migration.available === false);
		vaults = vaults.sort((e) => e.symbol === 'yvBOOST' ? -1 : 1);
	}
	const	vaultsWithStrats = [];

	for (let index = 0; index < vaults.length; index++) {
		const vault = vaults[index];
		const	[strategies] = await getVaultStrategies({
			vaultStrategies: vault.strategies,
			stratTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.token.symbol || '', 
			underlying: vault.token.address || '',
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			hasBoost: vault?.apy?.composite?.boost ? true : false,
			strategies,
		});
	}
	return (vaultsWithStrats);
}

const	vaultsMapping = {};
let		vaultsMappingAccess = {};
export default async function handler(req, res) {
	let		{network, isCurve, isRetired, isV1, isAll, isStable, isDefi, revalidate} = req.query;
	network = Number(network);

	const	now = new Date().getTime();
	const	lastAccess = vaultsMappingAccess[network] || 0;
	if (lastAccess === 0 || ((now - lastAccess) > 5 * 60 * 1000) || revalidate === 'true' || !vaultsMapping[network]) {
		const	result = await getStrategies({network, isCurve, isRetired, isV1, isAll, isStable, isDefi});
		vaultsMapping[network] = result;
		vaultsMappingAccess[network] = now;
	}
	res.setHeader('Cache-Control', 's-maxage=6000'); // 60 minutes
	return res.status(200).json(vaultsMapping[network]);
}

export async function listVaultsWithStrategies({network = 1, isCurve = false, isRetired = false, isV1 = false, isAll = false, isStable = false, isDefi = false}) {
	network = Number(network);
	const	result = await getStrategies({network, isCurve, isRetired, isV1, isAll, isStable, isDefi});
	return JSON.stringify(result);
}