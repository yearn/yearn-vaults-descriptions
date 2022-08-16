const Dotenv = require('dotenv-webpack');

module.exports = ({
	i18n: {
		locales: ['en', 'fr', 'es', 'de', 'pt', 'el', 'tr', 'vi', 'zh', 'hi', 'ja', 'id', 'ru'],
		defaultLocale: 'en'
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com',
			'raw.githubusercontent.com'
		]
	},
	env: {
		USE_PRICES: false,
		USE_PRICE_TRI_CRYPTO: false,
		CG_IDS: [],
		TOKENS: [],
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		API_URL: 'https://api.ycorpo.com',
		META_API_URL: 'https://meta.yearn.finance/api',
		META_GITHUB_URL: 'https://github.com/yearn/yearn-meta'
	}
});
