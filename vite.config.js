import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'auth/login.html'),
        register: path.resolve(__dirname, 'auth/register.html'),
        details: path.resolve(__dirname, 'details/index.html'),
        profile: path.resolve(__dirname, 'profile/index.html'),
        create: path.resolve(__dirname, 'create/index.html')
      }
    }
  }
});
