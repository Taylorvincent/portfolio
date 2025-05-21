module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	parserOptions: { ecmaVersion: 2020 }, // You can safely bump to 2020 or higher
	ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'],
	extends: ['eslint:recommended'],
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			parser: '@typescript-eslint/parser',
			settings: { react: { version: 'detect' } },
			env: {
				browser: true,
				node: true,
				es6: true,
			},
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:react/recommended',
				'plugin:react-hooks/recommended',
				'plugin:jsx-a11y/recommended',
				'plugin:prettier/recommended', // includes prettier plugin and recommended rules
				'next/core-web-vitals', // ✅ add Next.js rules
			],
			rules: {
				'prettier/prettier': ['error', {}, { usePrettierrc: true }],
				'react/prop-types': 'off',
				'react/react-in-jsx-scope': 'off',
				'jsx-a11y/anchor-is-valid': 'off',
				'@typescript-eslint/no-unused-vars': ['error'],
				'@typescript-eslint/explicit-function-return-type': [
					'warn',
					{
						allowExpressions: true,
						allowConciseArrowFunctionExpressionsStartingWithVoid: true,
					},
				],
				'react/no-unescaped-entities': 'off',
			},
		},
	],
}
