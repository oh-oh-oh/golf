import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const readConfig = (key: string) => ({
  [`process.env${key}`]: JSON.stringify(process.env[key]),
});

export default defineConfig({
  root: 'client',
  // define: {},
  resolve: {
    alias: {
      '@/components': resolve(__dirname, './client/components'),
      '@/contexts': resolve(__dirname, './client/contexts'),
      '@/hooks': resolve(__dirname, './client/hooks'),
      '@/pages': resolve(__dirname, './client/pages'),
      '@/utils': resolve(__dirname, './client/utils'),
      '@/server': resolve(__dirname, './client/server'),
    },
  },
  esbuild: {
    jsxInject: 'import __react from "react"',
    jsxFactory: '__react.createElement',
    jsxFragment: '__react.Fragment',
  },
  plugins: [reactRefresh()],
});
