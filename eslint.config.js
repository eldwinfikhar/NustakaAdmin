import react from '@eslint/js';
import ts from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';

export default ts.config(
  react.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'tailwindcss': tailwind,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['dist', 'node_modules'],
  }
);