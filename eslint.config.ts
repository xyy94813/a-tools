import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  yaml: true,
  vue: false,
  pnpm: false,
  ignores: [
    'node_modules/**/*', // output dir
    'dist/**/*', // output dir
    '.yarn/**/*', // yarn dir
    '.pnp.*', // yarn pnp files
    'coverage', // vitest coverage
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
  },
})
