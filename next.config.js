const Dotenv = require('dotenv-webpack');

module.exports = ({
	i18n: {
		locales: ['en-US', 'fr', 'es-es', 'ru'],
		defaultLocale: 'en-US',
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		],
	},
	env: {
		WEBSITE_URI: 'https://strategies.major.tax/',
	}
});
