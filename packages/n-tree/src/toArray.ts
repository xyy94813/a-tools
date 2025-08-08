import type { TreeNode } from './model'
import { traverse } from './traverse'

type TraverseParameters = Parameters<typeof traverse>

export function toArray<TNode = TreeNode>(root: TNode, options?: TraverseParameters[2]): TNode[] {
  const arr: TNode[] = []
  traverse<TNode>(root, node => arr.push(node), options)
  return arr
}
