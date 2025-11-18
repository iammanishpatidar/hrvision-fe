import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineVitestConfig(
  defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true, // Enable global APIs like `describe`, `it`, etc.
      environment: 'jsdom', // Use jsdom for DOM simulation
      setupFiles: './src/setupTests.ts', // Optional: Setup file for global configurations
    },
  })
);
