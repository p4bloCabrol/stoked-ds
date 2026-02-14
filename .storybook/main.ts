import { createRequire } from 'node:module';
import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const require = createRequire(import.meta.url);
const getAbsolutePath = (value: string) =>
  dirname(require.resolve(join(value, 'package.json')));

const config: StorybookConfig = {
  stories: [
    '../src/Introduction.mdx',
    '../src/docs/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite') as any,
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!stoked-ds)/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
