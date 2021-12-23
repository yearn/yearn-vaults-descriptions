import	React, {useContext, createContext}	from	'react';

const	Localization = createContext();

function	getCommons(router) {
	try {
		const	_common = require(`/localization/${router.locale}/common.json`);
		const	_commonFallback = require('/localization/en-US/common.json');
		const	_commonWithFallback = Object.assign(_commonFallback, _common);
		return (_commonWithFallback);
	} catch (e) {
		const	_common = require('/localization/en-US/common.json');
		return (_common);
	}
}

export const LocalizationContextApp = ({children, router}) => {
	const	[language, set_language] = React.useState(router.locale || 'en-US');
	const	[common, set_common] = React.useState(getCommons(router));

	React.useEffect(() => {
		set_common(getCommons(router));
	}, [router]);

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

export const useLocalization = () => useContext(Localization);
export default useLocalization;
