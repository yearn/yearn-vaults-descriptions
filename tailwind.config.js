const {join} = require('path');

module.exports = {
	presets: [
		require('@yearn-finance/web-lib/config/tailwind.config.cjs')
	],
	content: [
		join(__dirname, 'pages', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'icons', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'logo', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'strategies', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', 'vaults', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'components', '**', '*.{js,jsx,ts,tsx}'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'layouts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'components', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'contexts', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'icons', '**', '*.js'),
		join(__dirname, 'node_modules', '@yearn-finance', 'web-lib', 'dist', 'utils', '**', '*.js')
	],
	theme: {
		extend: {
			gridColumn: {
				'span-15': 'span 15 / span 15'
			},
			gridTemplateColumns: {
				'15': 'repeat(15, minmax(0, 1fr))'
			},
			width: {
				30: '7.5rem',
				33: '8.25rem',
				38: '9.5rem',
				42: '10.5rem',
				50: '12.5rem',
				55: '13.75rem'
			},
			minWidth: {
				33: '8.25rem',
				55: '13.75rem'
			},
			height: {
				30: '7.5rem'
			},
			maxWidth: {
				'xl': '552px',
				'4xl': '904px',
				'6xl': '1200px'
			}
		}
	}
};