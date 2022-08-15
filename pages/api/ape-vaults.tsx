/* eslint-disable @typescript-eslint/prefer-for-of */
import	{ethers}				from	'ethers';
import	{Provider, Contract}	from	'ethcall';
import	{toAddress}				from	'utils';
import {NextApiRequest, NextApiResponse} from 'next/types';
import {TStratTree, TStrategyMetadata, TApeVault, TVaultStrategies, TVaultWithStrats} from 'types';

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

export async function newEthCallProvider(provider: ethers.providers.JsonRpcProvider, chainID: number): Promise<Provider>  {
	const	ethcallProvider = new Provider();
	if (chainID === 1337) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		if(ethcallProvider.multicall){
			ethcallProvider.multicall.address = '0xc04d660976c923ddba750341fe5923e47900cf24';
		}

		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	if (chainID === 250) {
		if(ethcallProvider.multicall){
			ethcallProvider.multicall.address = '0xc04d660976c923ddba750341fe5923e47900cf24';
		}
	}
	if (chainID === 42161) {
		if(ethcallProvider.multicall){
			ethcallProvider.multicall.address = '0x10126Ceb60954BC35049f24e819A380c505f8a0F';
		}
	}
	return	ethcallProvider;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchStrategies({vaultAddress, network}: {vaultAddress: string, network: number}) {
	const	vaultContract = new Contract(
		vaultAddress,
		[{'stateMutability': 'view', 'type': 'function', 'name': 'withdrawalQueue', 'inputs': [{'name': 'arg0', 'type': 'uint256'}], 'outputs': [{'name': '', 'type': 'address'}], 'gas': '4057'}]
	);
	const	strategiesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	const 	calls = [];
	for (let i = 0; i < strategiesIndex.length; i++) {
		calls.push(vaultContract.withdrawalQueue(strategiesIndex[i]));
	}
	const	ethcallProvider = await newEthCallProvider(getProvider(network), network);
	const	callResult = await ethcallProvider.tryAll(calls);
	return	callResult.filter((a): boolean => a !== ethers.constants.AddressZero);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchNames({addresses, network}: {addresses: string[], network: number}) {
	const 	calls = [];
	for (let index = 0; index < addresses.length; index++) {
		const	strategyContract = new Contract(
			addresses[index],
			[{'inputs':[], 'name':'name', 'outputs':[{'internalType':'string', 'name':'', 'type':'string'}], 'stateMutability':'view', 'type':'function'}]
		);
		calls.push(strategyContract.name());
	}
	const	ethcallProvider = await newEthCallProvider(getProvider(network), network);
	const	callResult = await ethcallProvider.tryAll(calls);
	return	callResult.filter((a): boolean => a !== ethers.constants.AddressZero);	
}


async function getVaultStrategies({vaultAddress, network, stratTree}: {vaultAddress: string, network: number, stratTree: TStratTree}): Promise<TVaultStrategies> {
	const	vaultStrategies = await fetchStrategies({vaultAddress, network});

	const 	strategies = [];
	let		hasMissingStrategiesDescriptions = false;
	for (let i = 0; i < vaultStrategies.length; i++) {
		const	strategyAddress = toAddress(vaultStrategies[i] as string);
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
	for (let index = 0; index < strategies.length; index++) {
		const strategy = strategies[index];
		if (!strategy.name) {
			strategyWithNoName.push(strategy.address);
		}
	}
	const	noNameNames = await fetchNames({addresses: strategyWithNoName, network});
	
	let		noNameIndex = 0;
	for (let index = 0; index < strategies.length; index++) {
		const strategy = strategies[index];
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

	for (let index = 0; index < allStrategiesAddr.length; index++) {
		const stratDetails = allStrategiesAddr[index];
		for (let jindex = 0; jindex < (stratDetails.addresses).length; jindex++) {
			const address = stratDetails.addresses[jindex];
			stratTree[toAddress(address)] = {
				description: stratDetails.description,
				name: stratDetails.name
			};
		}
	}

	const	vaults: TApeVault[] = (await (await fetch(`https://ape.tax/api/vaults?network=${network}`)).json()).data;
	const	vaultsWithStrats = [];
	const	filteredVaults = vaults.filter((e): boolean => e.status !== 'endorsed');

	for (let index = 0; index < filteredVaults.length; index++) {
		const vault: TApeVault = filteredVaults[index];
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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function handler(req: NextApiRequest, res: NextApiResponse){
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
