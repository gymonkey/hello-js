import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(function ({ mode, command }) {
  return {
    base: command === 'build' ? '/admin/' : '/',
    css: { preprocessorOptions: { scss: { charset: false } } },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:7669',
          changeOrigin: true,
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
})
