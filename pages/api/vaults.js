import {toAddress} from 'utils';

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
				description: (details?.description ? details.description : '')
			});	
		} else {
			strategies.push({
				address: strategyAddress || '',
				name: strategyName || '',
				description: ''
			});	
			hasMissingStrategiesDescriptions = true;
		}
	}
	return ([strategies, hasMissingStrategiesDescriptions]);
}

async function getStrategies({network, isCurve, isRetired, isV1, isAll}) {
	let		allStrategiesAddr = await (await fetch(`https://meta.yearn.network/strategies/${network}/all`)).json();
	const	stratTree = {};

	for (let index = 0; index < allStrategiesAddr.length; index++) {
		const stratDetails = allStrategiesAddr[index];
		for (let jindex = 0; jindex < (stratDetails.addresses).length; jindex++) {
			const address = stratDetails.addresses[jindex];
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name,
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
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			strategies,
		});
	}
	return (vaultsWithStrats);
}

const	vaultsMapping = {};
let		vaultsMappingAccess = {};
export default async function handler(req, res) {
	let		{network, isCurve, isRetired, isV1, isAll, revalidate} = req.query;
	network = Number(network);

	const	now = new Date().getTime();
	const	lastAccess = vaultsMappingAccess[network] || 0;
	if (lastAccess === 0 || ((now - lastAccess) > 5 * 60 * 1000) || revalidate === 'true' || !vaultsMapping[network]) {
		const	result = await getStrategies({network, isCurve, isRetired, isV1, isAll});
		vaultsMapping[network] = result;
		vaultsMappingAccess[network] = now;
	}
	res.setHeader('Cache-Control', 's-maxage=6000'); // 60 minutes
	return res.status(200).json(vaultsMapping[network]);
}

export async function listVaultsWithStrategies({network = 1, isCurve = false, isRetired = false, isV1 = false, isAll = false}) {
	network = Number(network);
	const	result = await getStrategies({network, isCurve, isRetired, isV1, isAll});
	return JSON.stringify(result);
}