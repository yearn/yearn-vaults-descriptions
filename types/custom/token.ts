export type TTokenTree = {
	[key: string]: {
		description: string,
		name: string,
		symbol: string,
		tokenNameOverride?: string
	}
};

export type TVaultTree = {
	[key: string]: boolean
};


export type TGetTokenStratParams = {
	vaultAddress: string,
	wantAddress: string,
	wantName: string,
	tokenTree: TTokenTree,
	vaultTree: TVaultTree
};

export type TTokenStrategy = [
	tokens: [
		{ipfs: boolean},
		{address: string, name: string, description: string, ipfs: boolean}
	],
	hasMissingTokenInfo: boolean 
]

export type TToken = {
	address: string
	symbol: string
	name: string
	display_name: string
	icon: string
	tokens: [
		{ipfs: boolean},
		{address: string, name: string, description: string, ipfs: boolean}
	]
	hasMissingTokenInfo: boolean
}