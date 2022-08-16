/* eslint-disable @typescript-eslint/prefer-for-of */
import {NextApiRequest, NextApiResponse} from 'next/types';
import {toAddress} from 'utils';
import {TVaultWithStrats, TStrategyMetadata, TStratTree, TVault,
	TVaultStrategy, TVaultStrategies} from 'types';

async function getVaultStrategies({vaultStrategies, stratTree}: {vaultStrategies: TVaultStrategy[], stratTree: TStratTree}): Promise<TVaultStrategies> {
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

async function getStrategies({network}: {network: number}): Promise<TVaultWithStrats[]> {
	const		allStrategiesAddr: TStrategyMetadata[] = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
	const	stratTree: TStratTree = {};

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

	let		vaults: TVault[] = (await (await fetch(`${process.env.API_URL}/${network}/vaults/all`)).json());
	vaults = vaults.filter((e): boolean => !e.migration || !e.migration?.available);
	vaults = vaults.filter((e): boolean => e.type !== 'v1');
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const network = Number(req.query.network);
	const	result = await getStrategies({network});
	return res.status(200).json(result);
}

export async function listVaultsWithStrategies({network = 1}): Promise<string> {
	network = Number(network);
	const	result = await getStrategies({network});
	return JSON.stringify(result);
}