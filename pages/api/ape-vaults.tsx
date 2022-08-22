import	{Contract}	from	'ethcall';
import 	{providers} from '@yearn-finance/web-lib/utils';
import	{toAddress}				from	'utils';
import 	{NextApiRequest, NextApiResponse} from 'next/types';
import 	{TStratTree, TStrategyMetadata, TApeVault, TVaultStrategies, TVaultWithStrats} from 'types';
import {ethers} from 'ethers';

export function getProvider(chain = 1): ethers.providers.JsonRpcProvider {
	if (chain === 1) {
		return new ethers.providers.InfuraProvider('homestead', '9aa3d95b3bc440fa88ea12eaa4456161');
	} else if (chain === 137) {
		return new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');
	} else if (chain === 250) {
		return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
	} else if (chain === 56) {
		return new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
	} else if (chain === 1337) {
		return new ethers.providers.JsonRpcProvider('http://localhost:8545');
	} else if (chain === 42161) {
		return new ethers.providers.JsonRpcProvider('https://arbitrum.public-rpc.com');
	} 
	return new ethers.providers.InfuraProvider('homestead', '9aa3d95b3bc440fa88ea12eaa4456161');
}

async function fetchStrategies({vaultAddress, network}: {vaultAddress: string, network: number}): Promise<string[]> {
	const	vaultContract = new Contract(
		vaultAddress,
		[{'stateMutability': 'view', 'type': 'function', 'name': 'withdrawalQueue', 'inputs': [{'name': 'arg0', 'type': 'uint256'}], 'outputs': [{'name': '', 'type': 'address'}], 'gas': '4057'}]
	);
	const	strategiesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	const 	calls = [];
	for (const strategyIndex of strategiesIndex) {
		calls.push(vaultContract.withdrawalQueue(strategyIndex));
	}
	const	ethcallProvider = await providers.newEthCallProvider(getProvider(network));
	const	callResult = await ethcallProvider.tryAll(calls);
	const addresses = callResult.filter((a): boolean => a !== ethers.constants.AddressZero) as string[];

	return	addresses;
}

async function fetchNames({addresses, network}: {addresses: string[], network: number}): Promise<string[]> {
	const 	calls = [];
	for (const address of addresses) {
		const	strategyContract = new Contract(
			address,
			[{'inputs':[], 'name':'name', 'outputs':[{'internalType':'string', 'name':'', 'type':'string'}], 'stateMutability':'view', 'type':'function'}]
		);
		calls.push(strategyContract.name());
	}
	const	ethcallProvider = await providers.newEthCallProvider(getProvider(network));
	const	callResult = await ethcallProvider.tryAll(calls);
	const strategyNames = callResult.filter((a): boolean => a !== ethers.constants.AddressZero) as string[];

	return strategyNames;
}


async function getVaultStrategies({vaultAddress, network, stratTree}: {vaultAddress: string, network: number, stratTree: TStratTree}): Promise<TVaultStrategies> {
	const	vaultStrategies = await fetchStrategies({vaultAddress, network});

	const 	strategies = [];
	let		hasMissingStrategiesDescriptions = false;
	for (const strategy of vaultStrategies) {
		const	strategyAddress = toAddress(strategy);
		const	details = stratTree[strategyAddress];
		if (details) {
			if (!details?.description) {
				hasMissingStrategiesDescriptions = true;
			}
			strategies.push({
				address: strategyAddress || '',
				name: details?.name || '',
				description: (details?.description ? details.description : ''),
				noIPFS: false
			});	
		} else {
			strategies.push({
				address: strategyAddress || '',
				name: '',
				description: '',
				noIPFS: false
			});	
			hasMissingStrategiesDescriptions = true;
		}
	}
	const	strategyWithNoName = [];
	for (const strategy of strategies) {
		if (!strategy.name) {
			strategyWithNoName.push(strategy.address);
		}
	}
	const	noNameNames = await fetchNames({addresses: strategyWithNoName, network});
	
	let		noNameIndex = 0;
	for (const strategy of strategies) {
		if (!strategy.name) {
			strategy.noIPFS = true;
			strategy.name = noNameNames[noNameIndex++] as string;
		}
	}

	return ([strategies, hasMissingStrategiesDescriptions]);
}

async function getStrategies({network}: {network: number}): Promise<TVaultWithStrats[]> {
	const	allStrategiesAddr: TStrategyMetadata[] = await (await fetch(`${process.env.META_API_URL}/${network}/strategies/all`)).json();
	const	stratTree: TStratTree = {};

	for (const stratDetails of allStrategiesAddr) {
		for (const address of stratDetails.addresses) {
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name
			};
		}
	}

	const	vaults: TApeVault[] = (await (await fetch(`https://ape.tax/api/vaults?network=${network}`)).json()).data;
	const	vaultsWithStrats = [];
	const	filteredVaults = vaults.filter((e): boolean => e.status !== 'endorsed');

	for (const vault of filteredVaults) {
		const	[strategies, hasMissingStrategiesDescriptions] = await getVaultStrategies({
			vaultAddress: vault.address,
			network,
			stratTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.want.symbol || '', 
			underlying: vault.want.address || '',
			name: vault.title || '', 
			display_name: vault.title || '', 
			icon: vault.logo || '',
			strategies,
			hasMissingStrategiesDescriptions
		});
	}
	return (vaultsWithStrats);
}

const	vaultsMapping: {[key: number]: TVaultWithStrats[] } = {};
const		vaultsMappingAccess: {[key: number]: number} = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const		{revalidate} = req.query;
	const network = Number(req.query.network);

	const	now = new Date().getTime();
	const	lastAccess = vaultsMappingAccess[network] || 0;
	if (lastAccess === 0 || ((now - lastAccess) > 5 * 60 * 1000) || revalidate === 'true' || !vaultsMapping[network]) {
		const	result = await getStrategies({network});
		vaultsMapping[network] = result;
		vaultsMappingAccess[network] = now;
	}

	res.setHeader('Cache-Control', 's-maxage=6000'); // 60 minutes
	return res.status(200).json(vaultsMapping[network]);
}

export async function listVaultsWithStrategies({network = 1}): Promise<string> {
	network = Number(network);
	const	result = await getStrategies({network});
	return JSON.stringify(result);
}
