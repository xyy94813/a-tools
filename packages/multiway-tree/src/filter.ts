import type { TreeNode } from './model'

/**
 * Note: in-place filter function for multiway trees.
 */
export function filter<TNode = TreeNode>(
  root: TNode | undefined | null,
  callback: (node: TNode, pNode?: TNode) => boolean,
  propertyName = 'children',
): typeof root {
  if (root) {
    if (!callback(root, undefined)) {
      return null
    }

    // Filter the current node's children
    (root as any)[propertyName] = (root as any)[propertyName]
      ?.filter((node: TNode) => callback(node, root));

    // Recursively filter the children of the current node
    (root as any)[propertyName]
      ?.forEach((node: TNode) => {
        filter(node, callback, propertyName)
      })
  }

  return root
}
