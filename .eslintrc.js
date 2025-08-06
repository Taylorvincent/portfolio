module.exports = {
	extends: ['next/core-web-vitals', 'prettier'],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': [
			'warn',
			{
				allowExpressions: true,
				allowConciseArrowFunctionExpressionsStartingWithVoid: true,
			},
		],
		'@typescript-eslint/no-unused-vars': ['error'],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'react/no-unescaped-entities': 'off',
	},
}
