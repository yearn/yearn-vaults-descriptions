const Dotenv = require('dotenv-webpack');

module.exports = ({
	i18n: {
		locales: ['en', 'fr', 'es', 'ru', 'pt'],
		defaultLocale: 'en',
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		],
	},
	env: {
		WEBSITE_URI: 'https://vaults.yearn.finance/',
	}
});
