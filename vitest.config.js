import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    alias: {
      // Optional if you want to manually alias Vuetify styles
    },
    // 👇 This tells vitest how to handle non-JS files
    mockReset: true,
  },
  resolve: {
    alias: {
      // Optional alias if Vuetify CSS imports keep failing
    }
  },
  // 👇 mock CSS files
  css: {
    preprocessorOptions: {},
  },
})
