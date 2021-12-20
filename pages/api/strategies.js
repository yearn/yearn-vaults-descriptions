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

async function getStrategies({network}) {
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

	let		vaults = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter(e => !e.migration || !e.migration?.available);
	vaults = vaults.filter(e => e.type !== 'v1');
	const	vaultsWithStrats = [];

	for (let index = 0; index < vaults.length; index++) {
		const vault = vaults[index];
		const	[strategies, hasMissingStrategiesDescriptions] = await getVaultStrategies({
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
			hasMissingStrategiesDescriptions
		});
	}
	return (vaultsWithStrats);
}

const	oneVaultStrategiesMapping = {};
let		oneVaultStrategiesMappingAccess = {};
export default async function handler(req, res) {
	let		{network, revalidate} = req.query;
	network = Number(network);

	const	now = new Date().getTime();
	const	lastAccess = oneVaultStrategiesMappingAccess[network] || 0;
	if (lastAccess === 0 || ((now - lastAccess) > 5 * 60 * 1000) || revalidate === 'true' || !oneVaultStrategiesMapping[network]) {
		const	result = await getStrategies({network});
		oneVaultStrategiesMapping[network] = result;
		oneVaultStrategiesMappingAccess[network] = now;
	}
	res.setHeader('Cache-Control', 's-maxage=300'); // 5 minutes
	return res.status(200).json(oneVaultStrategiesMapping[network]);
}

export async function listVaultsWithStrategies({network = 1}) {
	network = Number(network);
	const	result = await getStrategies({network});
	return JSON.stringify(result);
}