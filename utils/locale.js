import	React				from	'react';
import	FlagFR				from	'components/localization/FlagFR';
import	FlagEN				from	'components/localization/FlagEN';
import	FlagES				from	'components/localization/FlagES';
import	FlagRU				from	'components/localization/FlagRU';

const	LOCALES = {
	'en-US': {
		'code': 'en-US',
		'name': 'English',
		'selectTitle': 'Language selection',
		'flag': <FlagEN width={32} height={24} />,
	},
	'fr': {
		'code': 'fr',
		'name': 'Français',
		'selectTitle': 'Sélection de la langue',
		'flag': <FlagFR width={32} height={24} />,
	},
	'es-es': {
		'code': 'es-es',
		'name': 'Español',
		'selectTitle': 'Selección de idioma',
		'flag': <FlagES width={32} height={24} />,
	},
	'ru': {
		'code': 'ru',
		'name': 'Русский',
		'selectTitle': 'Выбор языка',
		'flag': <FlagRU width={32} height={24} />,
	},
};

export default LOCALES;