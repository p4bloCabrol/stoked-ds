import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#101922' },
        { name: 'light', value: '#f6f7f8' },
        { name: 'surface', value: '#1e293b' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      return (
        <div data-theme={theme} style={{ padding: '1rem' }}>
          <Story />
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['dark', 'light'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
