// import matter from 'gray-matter'
import { defineConfig } from 'vitepress'
import pkg from '../../package.json'
import enUS from './en.mts'

export default defineConfig({
  lang: 'en-US',
  base: '/a-tools/multiway-tree/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: pkg.repository.url.replace('git+', '') },
    ],
  },
  rewrites: {
    'en-us/:rest*': ':rest*',
  },
  locales: {
    root: { label: 'English', lang: 'en-US', ...enUS },
  },
})
