import { describe, expect, test, vi } from 'vitest'
import { bfs, postOrder, preOrder, traverse } from '../traverse'

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

describe('bfs', () => {
  test('traverse correct', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    bfs(root, cb)
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 3, 4, 5, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 1, 2, 2, 3, 3]) // pNodeIds
  })

  test('custom child property name', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    bfs(createMockTree('sub'), cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 3, 4, 5, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 1, 2, 2, 3, 3]) // pNodeIds
  })

  test('root is Nil', () => {
    const cb = vi.fn()
    bfs(null, cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(0)
  })
})

describe('pre-order', () => {
  test('traverse correct', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    preOrder(root, cb)
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 4, 5, 3, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 2, 2, 1, 3, 3]) // pNodeIds
  })

  test('custom child property name', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    preOrder(createMockTree('sub'), cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 4, 5, 3, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 2, 2, 1, 3, 3]) // pNodeIds
  })

  test('root is Nil', () => {
    const cb = vi.fn()
    preOrder(null, cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(0)
  })
})

describe('post-order', () => {
  test('traverse correct', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    postOrder(root, cb)
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([4, 5, 2, 6, 7, 3, 1]) // root
    expect(pNodeIds).toEqual([2, 2, 1, 3, 3, 1, null]) // pNodeIds
  })

  test('custom child property name', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    postOrder(createMockTree('sub'), cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([4, 5, 2, 6, 7, 3, 1]) // root
    expect(pNodeIds).toEqual([2, 2, 1, 3, 3, 1, null]) // pNodeIds
  })

  test('root is Nil', () => {
    const cb = vi.fn()
    postOrder(null, cb, 'sub')
    expect(cb).toHaveBeenCalledTimes(0)
  })
})

describe('traverse', () => {
  test('default use bfs strategy, and with property', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    traverse(createMockTree('sub'), cb, { property: 'sub' })
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 3, 4, 5, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 1, 2, 2, 3, 3]) // pNodeIds
  })

  test('pre strategy with property', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    traverse(createMockTree('sub'), cb, { strategy: 'pre', property: 'sub' })
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([1, 2, 4, 5, 3, 6, 7]) // root
    expect(pNodeIds).toEqual([null, 1, 2, 2, 1, 3, 3]) // pNodeIds
  })

  test('post strategy with property', () => {
    const nodeIds: number[] = []
    const pNodeIds: number[] = []
    const cb = vi.fn((node, pNode) => {
      nodeIds.push(node.id)
      pNodeIds.push(pNode?.id ?? null)
    })
    traverse(createMockTree('sub'), cb, { strategy: 'post', property: 'sub' })
    expect(cb).toHaveBeenCalledTimes(7)
    expect(nodeIds).toEqual([4, 5, 2, 6, 7, 3, 1]) // root
    expect(pNodeIds).toEqual([2, 2, 1, 3, 3, 1, null]) // pNodeIds
  })
})
