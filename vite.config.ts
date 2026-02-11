import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { glob } from 'glob';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      include: ['src'],
      exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        '@tanstack/react-table',
        'react-day-picker',
        'react-day-picker/style.css',
        'react-select',
        'react-select/creatable',
      ],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              'src/**/*.test.{ts,tsx}',
              'src/**/*.stories.{ts,tsx}',
              'src/**/*.types.ts',
              'src/test/**',
            ],
          })
          .map((file) => [
            file.slice('src/'.length, file.lastIndexOf('.')),
            resolve(__dirname, file),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
    minify: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: 'stoked-[local]-[hash:base64:5]',
    },
  },
});
