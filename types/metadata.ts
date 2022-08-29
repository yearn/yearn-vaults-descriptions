// import {utils} from '@yearn-finance/web-lib';
import {TLocalization} from 'types';

export type TLocaleMetadata = {
	code: string,
	name: string,
	symbol: string
}

export type TStrategyMetadata = {
  addresses: string[],
	name: string;
	description: string;
  localization?: TLocalization;
	protocols: string[]
}