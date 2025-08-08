import { describe, expect, test } from 'vitest'
import { findAll } from '../findAll'

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

describe('findAll', () => {
  test('should find all nodes matching the callback', () => {
    const result = findAll(root, node => (node as any).id % 2 === 1)
      .map(node => (node as any).id)
    expect(result).toHaveLength(4)
    expect(result).toEqual([1, 3, 5, 7])
  })

  test('should return empty array if no match', () => {
    const result = findAll(root, () => false)
    expect(result).toEqual([])
  })

  test('should handle empty tree', () => {
    const result = findAll(undefined as any, () => true)
    expect(result).toEqual([])
  })

  test('custom child property name', () => {
    const root2 = createMockTree('sub')
    const result = findAll(root2, node => node.id % 2 !== 0, { property: 'sub' })
      .map(node => (node as any).id)
    expect(result).toEqual([1, 3, 5, 7])
  })
})
