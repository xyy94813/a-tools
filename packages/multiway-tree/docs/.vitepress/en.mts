import { defineConfig } from 'vitepress'
import pkg from '../../package.json'
import { createNav, createSidebar } from './utils.mjs'

export default defineConfig({
  title: pkg.name,
  description: pkg.description,
  //   base: '/multiway-tr/en-us/',
  lang: 'en-US',
  themeConfig: {
    get nav() {
      return createNav('en-us', [
        ['Guide', 'guide'],
        ['API', 'api'],
      ]).concat([
        { text: pkg.version, link: '' },
      ])
    },
    get sidebar() {
      const sides = createSidebar('en-us', [
        ['Guide', 'guide'],
        ['API', 'api'],
      ])
      return sides
    },
  },
})
