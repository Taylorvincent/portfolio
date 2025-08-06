const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // false, 'media' or 'class'
	theme: {
		extend: {
			colors: {
				teal: '#009688',
				gray: colors.neutral,
			},
		},
	},
	plugins: [],
}
