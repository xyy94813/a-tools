import { describe, expect, test } from 'vitest'
import { getDepth } from '../getDepth'

function createMockTree(childrenPropertyName = 'children') {
  return {
    id: 1,
    [childrenPropertyName]: [
      { id: 2, [childrenPropertyName]: [{ id: 4 }, { id: 5 }] },
      { id: 3, [childrenPropertyName]: [{ id: 6 }, { id: 7 }] },
    ],
  }
}

const root = createMockTree()

describe('getDepth', () => {
  test('traverse correct', () => {
    expect(getDepth(root)).toBe(3)
  })

  test('only one node', () => {
    expect(getDepth({ id: 1 })).toBe(1)
  })

  test('custom child property name', () => {
    expect(getDepth(createMockTree('sub'), 'sub')).toBe(3)
  })

  test('root is Nil', () => {
    expect(getDepth(null)).toBe(0)
    expect(getDepth(undefined)).toBe(0)
  })
})
