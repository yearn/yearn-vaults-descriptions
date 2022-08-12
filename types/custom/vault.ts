// import {utils} from '@yearn-finance/web-lib';

export type TVaultStrategy = {
  address: string,
	name: string
	description: string,
	localization?: object
}

export type TVaultStrategies = [strategies: TVaultStrategy[], hasMissingStrategiesDescriptions: boolean];

export type TStratTree = {
	[key: string]: {
		description: string
		name: string
		localization?: object
	}
}

export type TVault = {
	inception: number,
	address: string,
	symbol: string,
	name: string,
	display_name: string,
	icon: string,
	token: {
		name: string,
		symbol: string,
		address: string,
		decimals: number,
		display_name: string,
		icon: string,
	}
	tvl: {
		total_assets: number,
		price: number,
		tvl: number
	},
	apy: {
		type: string,
		gross_apr: number,
		net_apy: number
		fees: {
			performance: number | null
			withdrawal: number | null
			management: number | null
			keep_crv: number | null
			cvx_keep_crv: number | null
		},
		points: {
			week_ago: number,
			month_ago: number,
			inception: number,
		}
		composite: {
			boost: boolean
		}
	},
	strategies: TVaultStrategy[],
	endorsed: boolean,
	version: string,
	decimals: number,
	type: string,
	emergency_shutdown: boolean,
	updated: number,
	migration: { 
		available: boolean
	} | null,
	special: boolean | null
}

export type TVaultWithStrats = {
  address: string,
	symbol: string
	underlying: string
	name: string
	display_name: string
	icon: string
	hasBoost: boolean
	strategies: TVaultStrategy[]
}
