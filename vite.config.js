import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'frontend',
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
    environment: 'jsdom',
    include: ['../tests/**/*.test.?(c|m)[jt]s?(x)', 'src/**/*.test.?(c|m)[jt]s?(x)']
  }
});
