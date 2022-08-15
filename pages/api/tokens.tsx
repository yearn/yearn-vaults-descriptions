/* eslint-disable @typescript-eslint/prefer-for-of */
import {NextApiRequest, NextApiResponse} from 'next/types';
import {toAddress} from 'utils';
import {TVaultMetadata, TTokenMetadata, TTokenTree, TVaultTree,
	TVault, TGetTokenStratParams, TTokenStrategy, TToken} from 'types';

	
async function getVaultStrategies({vaultAddress, wantAddress, wantName, tokenTree, vaultTree}: TGetTokenStratParams): Promise<TTokenStrategy> {
	const	vaultTokenAddress = toAddress(vaultAddress);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const	vaultTokenHasIPFSFile = vaultTree[vaultTokenAddress];

	const	wantTokenAddress = toAddress(wantAddress);
	const	wantTokenName = tokenTree[wantTokenAddress]?.tokenNameOverride || wantName;
	const	wantTokenDescription = tokenTree[wantTokenAddress]?.description || '';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const	wantTokenHasIPFSFile = tokenTree[wantTokenAddress] ? true : false;

	return ([[
		{ipfs: vaultTokenHasIPFSFile},
		{address: wantTokenAddress, name: wantTokenName, description: wantTokenDescription, ipfs: wantTokenHasIPFSFile}
	], !vaultTokenHasIPFSFile || !wantTokenHasIPFSFile]);
}

async function getTokens({network}: {network: number}): Promise<TToken[]> {
	const		vaultDataFromIPFS: TVaultMetadata[] = await (await fetch(`${process.env.META_API_URL}/${network}/vaults/all`)).json();
	const		dataFromIPFS: TTokenMetadata[] = await (await fetch(`${process.env.META_API_URL}/${network}/tokens/all`)).json();

	const	tokenTree: TTokenTree = {};
	const	vaultTree: TVaultTree = {};

	for (let index = 0; index < dataFromIPFS.length; index++) {
		const tokenDetails = dataFromIPFS[index];
		const address = tokenDetails.address;
		tokenTree[toAddress(address)] = {
			description: tokenDetails.description || '',
			name: tokenDetails?.tokenNameOverride || '',
			symbol: tokenDetails?.tokenSymbolOverride || ''
		};
	}

	for (let index = 0; index < vaultDataFromIPFS.length; index++) {
		const vaultDetails = vaultDataFromIPFS[index];
		const address = vaultDetails.address;
		vaultTree[toAddress(address)] = true;
	}


	let		vaults: TVault[] = (await (await fetch(`https://api.yearn.finance/v1/chains/${network}/vaults/all`)).json());
	vaults = vaults.filter((e): boolean => !e.migration || !e.migration?.available);
	vaults = vaults.filter((e): boolean => e.type !== 'v1');
	const	vaultsWithStrats = [];

	for (let index = 0; index < vaults.length; index++) {
		const vault = vaults[index];
		const	[tokens, hasMissingTokenInfo] = await getVaultStrategies({
			vaultAddress: vault.address,
			wantAddress: vault?.token?.address,
			wantName: vault?.token?.name,
			tokenTree,
			vaultTree
		});

		vaultsWithStrats.push({
			address: vault.address || '', 
			symbol: vault.token.symbol || '', 
			name: vault.name || '', 
			display_name: vault.display_name || '', 
			icon: vault.icon || '',
			tokens,
			hasMissingTokenInfo
		});
	}

	return (vaultsWithStrats);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const network = Number(req.query.network);
	const result = await getTokens({network});
	return res.status(200).json(result);
}

export async function listVaultsWithTokens({network = 1}): Promise<string> {
	network = Number(network);
	const	result = await getTokens({network});
	return JSON.stringify(result);
}