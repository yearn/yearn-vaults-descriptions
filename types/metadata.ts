// import {utils} from '@yearn-finance/web-lib';

export type TStrategyMetadata = {
  addresses: string[],
	name: string;
	description: string;
	localization?: object;
	protocols: string[]
}

export type TVaultMetadata = {
	address: string,
	allowZapIn: boolean,
	allowZapOut: boolean,
	comment: string,
	depositsDisabled: boolean,
	displayName: string,
	hideAlways: boolean,
	migrationAvailable: boolean,
	order: number,
	retired: boolean,
	withdrawalsDisabled: boolean
}

export type TTokenMetadata = {
		name: string,
		symbol: string,
		website: string,
		description: string,
		categories: string[],
		address: string,
		tokenNameOverride?: string,
		tokenSymbolOverride?: string
	
}
