import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import withReactRouter from 'vite-plugin-next-react-router';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [withReactRouter(), reactRefresh(), Inspect()],
});
