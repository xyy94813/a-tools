---
outline: [2, 3]
---

# findAll

Returns an array containing all nodes that match the condition.

:::info
Unlike `filter()`, `findAll()` only includes nodes whose parents also match the condition.
:::

## Types

```ts
function findAll<TNode = TreeNode>(
  root: TNode,
  callback: (node: TNode, pNode?: TNode) => boolean,
  options?: TraverseParameters[2]
): (typeof root)[]
```

## Example

### Find All Matched Node

:::code-group

```js [javascript]
import { findAll } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

findAll(root, node => !!(node.id % 2))
  .map(node => node.id) // [1, 3, 5, 7]
```

```ts [typescript]
import { findAll } from '@a-tools/multiway-tree'

type TNode = { id: number, children?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

findAll<TNode>(root, node => !!(node.id % 2))
  .map(node => node.id) // [1, 3, 5, 7]
```

:::

### Specified Child Property

:::code-group

```js [javascript]
import { findAll } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

findAll(root, node => node.id % 2, { property: 'child' })
  .map(node => node.id) // [1, 3, 5, 7]
```

```ts [typescript]
import { findAll } from '@a-tools/multiway-tree'

type TNode = { id: number, child?: TNode[] }

const root: TNode = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

findAll<TNode>(root, node => node.id % 2, { property: 'child' })
  .map(node => node.id) // [1, 3, 5, 7]
```

:::
