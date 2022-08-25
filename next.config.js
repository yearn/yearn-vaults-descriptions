/* eslint-disable @typescript-eslint/explicit-function-return-type */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production'
});
const {PHASE_EXPORT} = require('next/constants');

module.exports = (phase) => withPWA({
	assetPrefix: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT ? './' : '/',
	experimental: {
		images: {
			unoptimized: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT //Exporting image does not support optimization
		}
	},
	i18n: process.env.IPFS_BUILD === 'true' ? null : {
		locales: ['en', 'fr', 'es', 'de', 'pt', 'el', 'tr', 'vi', 'zh', 'hi', 'ja', 'id', 'ru'],
		defaultLocale: 'en'
	},
	images: {
		domains: [
			'rawcdn.githack.com',
			'raw.githubusercontent.com'
		]
	},
	env: {				
		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			10: process.env.WS_URL_OPTIMISM,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			10: process.env.RPC_URL_OPTIMISM,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY,

		/* 🔵 - Yearn Finance **************************************************
		** Yearn Watch specific config
		**********************************************************************/
		YDAEMON_API_URL: 'https://ydaemon.yearn.finance',
		META_API_URL: 'https://meta.yearn.finance/api',
		META_GITHUB_URL: 'https://github.com/yearn/yearn-meta'
	}
});
