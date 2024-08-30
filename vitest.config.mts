import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    root: process.cwd(),
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.mts',
    coverage: {
      provider: 'v8',
      exclude: [
        '**/postcss.config.js',
        '**/postcss.config.mjs',
        '**/.eslintrc.cjs',
        'next/**',
        'dist/**',
        'dict/**',
        'vitest.config.mts',
        '.lintstagedrc.mjs',
        'next.config.mjs',
        'next-env.d.ts',
        'svgr.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
