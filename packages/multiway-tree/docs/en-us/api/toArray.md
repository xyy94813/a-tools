---
outline: [2, 3]
---

# toArray

Transform tree to array.

## Types

```ts
type TraverseParameters = Parameters<typeof traverse>

function toArray<TNode = TreeNode>(
  root: TNode,
  options?: TraverseParameters[2],
): TNode[]
```

## Example

### With Difference Strategy

:::code-group

```js [javascript]
import { toArray } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

toArray(root).map(node => node.id) // [1,2,3,4,5,6,7], default is bfs
toArray(root, { strategy: 'pre' }).map(node => node.id) // [1,2,4,5,3,6,7]
toArray(root, { strategy: 'post' }).map(node => node.id) // [4,5,2,6,7,3,1]
```

```ts [javascript]
import { toArray } from '@a-tools/multiway-tree'

type TNode = { id: number, children?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

toArray<TNode>(root).map(node => node.id) // [1,2,3,4,5,6,7]
```

:::

### Specified Child Property

:::code-group

```js [javascript]
import { toArray } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

toArray(root, { property: 'child' }).map(node => node.id) // [1,2,3,4,5,6,7]
```

```ts [javascript]
import { toArray } from '@a-tools/multiway-tree'

type TNode = { id: number, child?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

toArray<TNode>(root).map(node => node.id) // [1,2,3,4,5,6,7]
```

:::
