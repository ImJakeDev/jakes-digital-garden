import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPlugin from '@eslint/js';
import { configs as tseslintConfigs } from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import prettier from 'eslint-config-prettier/flat';
import * as mdxPlugin from 'eslint-plugin-mdx';

// ESLint recommended rules for JavaScript/TypeScript
const eslintConfig = defineConfig([
  {
    name: 'project/javascript-recommended',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ...eslintPlugin.configs.recommended,
  },
]);

// TypeScript configuration with type-checked rules
const typescriptConfig = defineConfig([
  {
    name: 'project/typescript-strict',
    files: ['**/*.{ts,tsx,mjs}'],
    extends: [...tseslintConfigs.strictTypeChecked, ...tseslintConfigs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        // Automatically detects tsconfig.json
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      // Disable rules that conflict with TypeScript's own error checking
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      // disabled next rule due to bug:
      // https://github.com/typescript-eslint/typescript-eslint/issues/11732
      // https://github.com/eslint/eslint/issues/20272
      '@typescript-eslint/unified-signatures': 'off',
      // Allow ts-expect-error and ts-ignore with descriptions
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': false,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
    },
  },
  {
    name: 'project/javascript-disable-type-check',
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslintConfigs.disableTypeChecked,
  },
]);

// React and Next.js configuration
const reactConfig = defineConfig([
  {
    name: 'project/react-next',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      // React Hooks rules (use recommended-latest for latest features)
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      // Accessibility rules (strict mode for better a11y)
      ...jsxA11yPlugin.configs.strict.rules,
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      // Next.js Core Web Vitals rules
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Customizations for modern React/Next.js
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Use TypeScript instead
      'react/no-unknown-property': 'off', // Conflicts with custom attributes
      'react/jsx-no-target-blank': 'off', // Next.js handles this

      // Fine-tuned accessibility rules
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'], // Next.js Image component
        },
      ],
      'jsx-a11y/media-has-caption': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
]);

// Code style and formatting configuration
const stylisticConfig = defineConfig([
  {
    name: 'project/stylistic',
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Remove legacy formatting rules from ESLint/TypeScript ESLint
      ...stylisticPlugin.configs['disable-legacy'].rules,
      // Add recommended stylistic rules as base
      ...stylisticPlugin.configs.recommended.rules,
    },
  },
]);

// MDX configuration
const mdxConfig = defineConfig([
  {
    name: 'project/mdx-files',
    files: ['**/*.mdx'],
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      // Disable linting code blocks for better performance
      lintCodeBlocks: false,
      languageMapper: {},
    }),
  },
  {
    name: 'project/mdx-code-blocks',
    files: ['**/*.mdx'],
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  {
    name: 'project/mdx-react-overrides',
    files: ['**/*.mdx'],
    rules: {
      // MDX often has unescaped entities in text content
      'react/no-unescaped-entities': 'off',
    },
  },
]);

// React Compiler configuration (experimental)
const reactCompilerConfig = defineConfig([
  {
    name: 'project/react-compiler',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
]);

// Export the complete configuration
export default defineConfig([
  ...eslintConfig,
  ...typescriptConfig,
  ...reactConfig,
  ...stylisticConfig,
  ...mdxConfig,
  ...reactCompilerConfig,
  prettier,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'next.config.ts',
  ]),
]);
