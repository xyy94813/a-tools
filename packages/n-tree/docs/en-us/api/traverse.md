---
outline: [2, 3]
---

# traverse

Traverse n-tree with strategy. The default strategy is `bfs`.

## Types

```ts
type TreeNode<Key extends string = 'children'> = {
  [p in Key]?: TreeNode<Key>[];
}

type TraverseCallback<Node = TreeNode> = (node: Node, pNode?: Node) => void

type TraverseOptions = {
  strategy?: 'bfs' | 'pre' | 'post'
  property?: string
}

function traverse<TNode = TreeNode>(
  root: TNode,
  callback: TraverseCallback<typeof root>,
  options?: TraverseOptions,
): void
```

## Example

### Bfs as default

:::code-group

```js [javascript]
import { traverse } from '@a-tools/n-tree'

const root = { children: [] }

traverse(root, (cur, parent) => {
  console.log(cur, parent)
})
```

```ts [typescript]
import { traverse } from '@a-tools/n-tree'

const root = { children: [] }

traverse(root, (cur, parent) => {
  console.log(cur, parent)
})
```

:::

### Specified strategy

:::code-group

```js [javascript]
import { traverse } from '@a-tools/n-tree'

const root = { children: [] }

traverse(root, (cur, parent) => {
  console.log(cur, parent)
}, { strategy: 'pre' })
```

```ts [typescript]
import { traverse } from '@a-tools/n-tree'

const root = { children: [] }

traverse(root, (cur, parent) => {
  console.log(cur, parent)
}, { strategy: 'pre' })
```

:::

### Specified child property

:::code-group

```js [javascript]
import { traverse } from '@a-tools/n-tree'

const root = { child: [] }

traverse(root, (cur, parent) => {
  console.log(cur, parent)
}, { property: 'child' })
```

```ts [typescript]
import { traverse } from '@a-tools/n-tree'

type TreeNode = { child?: TreeNode }

const root: TreeNode = { child: [] }

traverse<TreeNode>(root, (cur, parent) => {
  console.log(cur, parent)
}, { property: 'child' })
```

:::
