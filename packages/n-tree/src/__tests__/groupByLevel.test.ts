import { describe, expect, test } from 'vitest'
import { groupByLevel } from '../groupByLevel'

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

describe('groupByLevel', () => {
  test('traverse correct', () => {
    const levels = groupByLevel(root)
    expect(levels.map(level => level.map(node => node.id))).toEqual([
      [1],
      [2, 3],
      [4, 5, 6, 7],
    ])
  })

  test('only one node', () => {
    expect(groupByLevel({ id: 1 })).toEqual([
      [{ id: 1 }],
    ])
  })

  test('custom child property name', () => {
    const levels = groupByLevel(createMockTree('sub'), 'sub')
    expect(levels.map(level => level.map(node => node.id))).toEqual([
      [1],
      [2, 3],
      [4, 5, 6, 7],
    ])
  })

  test('root is Nil', () => {
    expect(groupByLevel(null)).toEqual([])
    expect(groupByLevel(undefined)).toEqual([])
  })
})
