import type { DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const isMarkdownFile = (filename: string): boolean => filename.endsWith('.md')

export function getDocsFrontmatterTitle(filePath: string): string {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return matter(fileContent)?.data.title
}

function fillLangPrefix(lang: string, str: string): string {
  if (lang === 'en-us') {
    return str
  }
  return `${lang}/${str}`
}

export function createNav(
  lang: string,
  conf: [string, string][],
): DefaultTheme.NavItem[] {
  const docsRootPath = path.resolve(import.meta.dirname, '..', lang)
  return conf.map(([text, dir]) => {
    const mdFiles = fs.readdirSync(path.join(docsRootPath, dir))
      .filter(isMarkdownFile)
    return {
      text,
      link: fillLangPrefix(lang, `${dir}/${path.basename(mdFiles[0])}`),
      activeMatch: `/${dir}/`,
    }
  })
}

export function createSidebar(
  lang: string,
  conf: [string, string][],
): DefaultTheme.Sidebar {
  const docsRootPath = path.resolve(import.meta.dirname, '..', lang)
  return conf.map(([text, dir]) => {
    const dirPath = path.join(docsRootPath, dir)
    const items = fs.readdirSync(dirPath)
      .filter(isMarkdownFile)
      .map((fileName) => {
        const fullPath = path.join(dirPath, fileName)
        const fileBaseName = path.basename(fileName, '.md')
        const metaTitle = getDocsFrontmatterTitle(fullPath)
        return ({
          text: metaTitle || fileBaseName,
          link: `/${dir}/${fileBaseName}`,
        })
      })
    return {
      text,
      items,
    }
  })
}
