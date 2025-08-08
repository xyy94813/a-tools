import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

import pkg from './package.json'

export default defineConfig({
  mode: 'production',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    lib: {
      entry: ['src/index.ts'],
      name: import.meta.dirname,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
    },
  },
  plugins: [
    dts({
      include: ['src'],
      outDir: 'dist/types',
      entryRoot: 'src',
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', '__tests__/**/*'],
    }),
  ],
})
