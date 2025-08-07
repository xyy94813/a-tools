---
outline: [2, 3]
---

# getDepth

Returns the depth of N-Tree.

## Types

```ts
function getDepth<TNode = TreeNode>(
  root: TNode,
  property?: string
): number
```

## Example

### Common Use

:::code-group

```js [javascript]
import { getDepth } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

getDepth(root) // 3
getDepth(null) // 0
```

```ts [javascript]
import { getDepth } from '@a-tools/multiway-tree'

type TNode = { id: number, children?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

getDepth<TNode>(root) // 3
getDepth(null) // 0
```

:::

### Specified Child Property

:::code-group

```js [javascript]
import { getDepth } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

getDepth(root, 'child') // 3
```

```ts [javascript]
import { getDepth } from '@a-tools/multiway-tree'

type TNode = { id: number, child?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

getDepth<TNode>(root, 'child') // 3
```

:::
