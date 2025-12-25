import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

export default defineConfig({
  title: pkg.name,
  description: pkg.description,
  lang: 'en-US',
  themeConfig: {
    get nav() {
      return [
        { text: 'All Tools', items: [
          { text: '@a-tools/n-tree', link: '/a-tools/n-tree/en-us/' },
          { text: '@a-tools/converter', link: '/a-tools/converter/en-us/' },
        ] },
      ]
    },
  },
})
