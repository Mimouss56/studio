import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuration Vite avec destructuration atomique
export default defineConfig({
  plugins: [react()],  
  // Configuration des alias avec destructuration atomique
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@i18n': path.resolve(__dirname, './src/i18n')
    }
  },
  
  // Configuration du serveur de développement avec destructuration atomique
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true
  },
  
  // Configuration de la build avec destructuration atomique
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparation des chunks avec destructuration atomique
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['bootstrap', 'react-switch'],
          i18n: ['i18next', 'react-i18next']
        }
      }
    }
  },
  
  // Configuration des variables d'environnement avec destructuration atomique
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
    global: 'globalThis',
    'process.env': {}
  },
  
  // Configuration CSS avec destructuration atomique
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Configuration des optimisations avec destructuration atomique
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'i18next',
      'react-i18next',
      'bootstrap',
      'react-switch'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
}); 