import type { TreeNode } from './model'

export type TraverseCallback<Node = TreeNode> = (node: Node, pNode?: Node) => void

export function bfs<TNode = TreeNode>(
  root: TNode,
  callback: TraverseCallback<typeof root>,
  propertyName: string = 'children',
): void {
  if (!root)
    return

  const queue: TNode[] = [root]
  const pMap = new Map<TNode, TNode>()
  while (queue.length > 0) {
    const cur = queue.shift()!

    callback(cur, pMap.get(cur))
    pMap.delete(cur)

    const children = (cur as any)[propertyName]
    children?.forEach((child: TNode) => {
      queue.push(child)
      pMap.set(child, cur)
    })
  }
}

export function preOrder<TNode = TreeNode>(
  root: TNode,
  callback: TraverseCallback<typeof root>,
  propertyName: string = 'children',
): void {
  if (!root)
    return

  const queue: TNode[] = [root]
  const pMap = new Map<TNode, TNode>()
  while (queue.length) {
    const cur = queue.shift()!

    callback(cur, pMap.get(cur))
    pMap.delete(cur)

    const children = (cur as any)[propertyName]

    if (!Array.isArray(children))
      continue

    queue.unshift(...children)
    children.forEach((child: TNode) => pMap.set(child, cur))
  }
}

export function postOrder<TNode = TreeNode>(
  root: TNode,
  callback: TraverseCallback<typeof root>,
  propertyName = 'children',
): void {
  if (!root)
    return

  const arr: TNode[] = [root]
  const pMap = new Map<TNode, TNode>()
  let p: TNode | undefined
  while (arr.length) {
    const cur = arr[0]
    if (p !== cur) {
      const children = (cur as any)[propertyName]
      if (Array.isArray(children) && children.length > 0) {
        arr.unshift(...children)
        children.forEach((child: TNode) => pMap.set(child, cur!))
        p = cur
        continue
      }
    }
    p = pMap.get(cur)
    callback(cur, p)
    pMap.delete(cur) // 遍历完后节约空间
    arr.shift()!
  }
}

export type TraverseOptions = {
  strategy?: 'bfs' | 'pre' | 'post'
  property?: string
}

export function traverse<TNode = TreeNode>(
  root: TNode,
  callback: TraverseCallback<typeof root>,
  options?: TraverseOptions,
): void {
  const strategy = options?.strategy
  const property = options?.property
  if (strategy === 'pre') {
    preOrder(root, callback, property)
  }
  else if (strategy === 'post') {
    postOrder(root, callback, property)
  }
  else {
    bfs(root, callback, property)
  }
}
