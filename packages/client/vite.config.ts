import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      {
        find: /^@@\/(.*)$/,
        replacement: resolve(__dirname, '../$1'),
      },
      {
        find: /^@\/(.*)$/,
        replacement: resolve(__dirname, './src/$1'),
      },
    ],
  },
})
