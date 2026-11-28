import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'frontend',
  envDir: path.resolve(__dirname, '.'),
  publicDir: 'public',
  plugins: [react()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@backend': path.resolve(__dirname, './backend')
    }
  },
  server: {
    port: 5173,
    host: true,
    open: false,
    watch: {
      ignored: ['**/dist/**', '**/node_modules/**']
    },
    fs: {
      allow: [path.resolve(__dirname, '.')]
    }
  },
  test: {
    globals: true,
    environment: 'node',
    env: {
      VITE_ENABLE_MOCK_DATA: 'true'
    },
    include: ['../tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', 'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
});
