import { describe, expect, test } from 'vitest'
import { filter } from '../filter'

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

describe('filter', () => {
  test('should filter nodes in a multiway tree', () => {
    expect(filter(root, (node, pNode) => !pNode || node.id % 2 === pNode.id % 2)).toEqual({
      id: 1,
      children: [
        { id: 3, children: [{ id: 7 }] },
      ],
    })
  })

  test('custom child property name', () => {
    const root2 = createMockTree('sub')
    expect(filter(root2, node => node.id % 2 !== 0, 'sub')).toEqual({
      id: 1,
      sub: [
        { id: 3, sub: [{ id: 7 }] },
      ],
    })
  })

  test('should return null when do not match root', () => {
    expect(filter(root, node => node.id > 1)).toBe(null)
  })

  test('return root when root is not correct value', () => {
    expect(filter(null, () => true)).toBe(null)
    expect(filter(undefined, () => true)).toBe(undefined)
  })
})
