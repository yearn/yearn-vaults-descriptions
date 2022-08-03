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

async function getStrategies({network}) {
	let		allStrategiesAddr = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
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

	let		vaults = (await (await fetch(`https://api.ycorpo.com/${network}/vaults/all`)).json());
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

export default async function handler(req, res) {
	let		{network} = req.query;
	network = Number(network);
	const	result = await getStrategies({network});
	return res.status(200).json(result);
}

export async function listVaultsWithStrategies({network = 1}) {
	network = Number(network);
	const	result = await getStrategies({network});
	return JSON.stringify(result);
}