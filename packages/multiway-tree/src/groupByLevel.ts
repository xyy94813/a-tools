import type { TreeNode } from './model'
import { traverse } from './traverse'

export function groupByLevel<TNode = TreeNode>(
  root: TNode,
  property = 'children',
): TNode[][] {
  if (!root) {
    return []
  }

  const levels: TNode[][] = []
  traverse<TNode>(root, (node, pNode) => {
    if (!pNode) {
      levels.push([node])
      return
    }

    let curLevel = levels[levels.length - 1]

    // 进入下一层
    if (curLevel.includes(pNode)) {
      curLevel = []
      levels.push(curLevel)
    }

    curLevel.push(node)
  }, {
    property,
    strategy: 'bfs',
  })

  return levels
}
