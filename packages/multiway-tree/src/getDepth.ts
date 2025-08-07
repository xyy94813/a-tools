import type { TreeNode } from './model'
import { groupByLevel } from './groupByLevel'

export function getDepth<TNode = TreeNode>(
  root: TNode,
  property = 'children',
): number {
  if (!root)
    return 0
  // TODO: optimize performance
  return groupByLevel<TNode>(root, property).length
}
