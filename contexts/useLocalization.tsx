import	React, {useContext, createContext}	from	'react';

type TLocalizationContext = {
	common: {[key: string]: string},
	language: string,
	set_language?: React.Dispatch<React.SetStateAction<string>>
}

const	Localization = createContext<TLocalizationContext>({common: getCommons('en'), language: 'en'});

function	getCommons(language: string): {[key: string]: string} {
	try {
		const	_common = require(`/localization/${language}.json`);
		const	_commonFallback = require('/localization/en.json');
		const	_commonWithFallback = Object.assign({..._commonFallback}, {..._common});
		return (_commonWithFallback);
	} catch (e) {
		const	_common = require('/localization/en.json');
		return (_common);
	}
}

type TProps = {
  children: React.ReactNode;
	router: {locale: string};
}

export const LocalizationContextApp: React.FunctionComponent<TProps> = ({children, router}): React.ReactElement => {
	const	[language, set_language] = React.useState(router.locale || 'en');
	const	[common, set_common] = React.useState(getCommons(router.locale || 'en'));

	React.useEffect((): void => {
		set_common(getCommons(language));
	}, [language]);

	return (
		<Localization.Provider
			value={{
				common,
				language,
				set_language
			}}>
			{children}
		</Localization.Provider>
	);
};

export const useLocalization = (): TLocalizationContext => useContext(Localization);
export default useLocalization;
