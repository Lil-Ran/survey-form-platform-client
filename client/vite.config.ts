import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import process from 'process'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const TARGET = env.VITE_BACKEND_URL ?? 'http://localhost:55000'

  return {
    server: {
      port: 63000,
      proxy: {
        '/api': TARGET,
        '/assets': TARGET,
      },
    },
    preview: {
      port: 64000,
    },
    build: {
      assetsDir: 'static',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/[hash].js',
          assetFileNames: 'static/[hash].[ext]',
          entryFileNames: 'static/[name].[hash].js',
          compact: true,
        },
      },
    },
    html: {
      cspNonce: '%nonce%',
    },
    plugins: [
      react(),
      tsconfigPaths(),
      eslintPlugin(), // only for development
      Pages({
        dirs: [
          {
            dir: './src/pages',
            baseRoute: '',
            filePattern: '**/*.tsx',
          },
        ],
      }),
    ],
  }
})
