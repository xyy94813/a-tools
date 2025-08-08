export type TreeNode<Key extends string = 'children'> = {
  [p in Key]?: TreeNode<Key>[]
}
