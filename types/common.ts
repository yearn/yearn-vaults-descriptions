/**
 * Accepted locales.
 */
export type TLocale = 'de' | 'el' | 'en' | 'es' | 'fr' | 'hi' | 'id' | 'ja' | 'pt' | 'ru' | 'tr' | 'vi' | 'zh';

export type TLocalizedProperties = {
  name?: string;
  description: string;
}

export type TLocalization = {
	[key in TLocale as string]: TLocalizedProperties;
};

export type TNetworkInfo = {
	chainId: number
	explorerURL: string
}