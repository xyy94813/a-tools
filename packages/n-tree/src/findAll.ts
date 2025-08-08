import type { TreeNode } from './model'
import { traverse } from './traverse'

type TraverseParameters = Parameters<typeof traverse>

export function findAll<TNode = TreeNode>(
  root: TNode,
  callback: (node: TNode, pNode?: TNode) => boolean,
  options?: TraverseParameters[2],
): typeof root[] {
  const arr: TNode[] = []

  traverse<typeof root>(root, (node, parent) => {
    if (callback(node, parent)) {
      arr.push(node)
    }
  }, options)

  return arr
}
