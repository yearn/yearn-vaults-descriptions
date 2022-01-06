const colors = require('tailwindcss/colors');

module.exports = {
	corePlugins: {
		ringColor: false,
	},
	darkMode: 'class',
	purge: {
		content: [
			'./pages/**/*.js',
			'./components/**/*.js'
		],
	},
	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			mono: ['IBM Plex Mono', 'monospace']
		},
		colors: {
			red: colors.red,
			white: colors.white,
			black: colors.black,
			yblue: '#0657F9',
			fadeWhite: '#F2F2F2',
			ygray: {
				'50': '#F5F5F5',
				100: '#333333',
				200: '#4F4F4F',
				400: '#BDBDBD',
				500: '#E0E0E0',
				600: '#F2F2F2',
				'700': '#2c3e50',
				'900': '#363636',
			},
			dark: {
				900: '#181B21',
				600: '#1C2028',
				500: '#1E1E1E',
				400: '#21252E',
				200: '#535353',
				100: '#5d6e8f',
				50: '#8B8D90',
				white: 'rgba(255,255,255,0.9)',
			},
		},
		extend: {
			width: {
				'64.5': '16.125rem',
				'235.5': '58.875rem'
			},
			maxWidth: {
				'64.5': '16.125rem',
				'235.5': '58.875rem',
				'xl': '552px',
				'4xl': '904px',
				'6xl': '1200px',
			},
			maxHeight: {
				'max': '4000px',
			},
			lineHeight: {
				'6xl': '64px',
			},
			fontSize: {
				'sm': ['15px', '24px'],
				'6xl': ['56px', '64px'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	],
};