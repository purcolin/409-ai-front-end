const { fileURLToPath } = require('node:url');
const { mergeConfig, defineConfig, configDefaults } = require('vitest/config');
const viteConfig = require('./vite.config');

module.exports = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  })
);
