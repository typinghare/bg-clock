const js = require('@eslint/js')
// const reactPlugin = require('eslint-plugin-react')
// const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const globals = require('globals')

module.exports = [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            // react: reactPlugin,
            // '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...js.configs.recommended.rules, // ...tsPlugin.configs.recommended.rules,
            // ...reactPlugin.configs.recommended.rules,
            indent: ['error', 4],
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]
