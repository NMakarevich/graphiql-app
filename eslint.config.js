import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    plugins: {
      react: eslintReact,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'react-compiler': reactCompiler,
      prettier: eslintPluginPrettier,
    },
    ignores: ['node_modules', 'dist'],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: ['tsconfig.json'],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
    },
  },
);
