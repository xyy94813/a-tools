import { describe, expect, test } from 'vitest'
import { toArray } from '../toArray'

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

describe('toArray', () => {
  test('traverse correct', () => {
    const nodeIds = toArray(root).map(node => node.id)
    expect(nodeIds).toEqual([1, 2, 3, 4, 5, 6, 7]) // root
  })

  test('custom child property name', () => {
    const nodeIds = toArray(createMockTree('sub'), { property: 'sub' }).map(node => node.id)
    expect(nodeIds).toEqual([1, 2, 3, 4, 5, 6, 7]) // root
  })

  test('root is Nil', () => {
    expect(toArray(null)).toEqual([])
  })
})
