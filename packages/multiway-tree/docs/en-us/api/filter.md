---
outline: [2, 3]
---

# filter

::: warning
1. This is an in-place function, will modify original tree.
2. Tree node will not be modified, if its parent node is not matched.
:::

Filter tree by matcher.

## Types

```ts
function filter<TNode = TreeNode>(
  root: TNode | undefined | null,
  callback: (node: TNode, pNode?: TNode) => boolean,
  propertyName?: string
): typeof root
```

## Example

### Filter Tree By Matcher

:::code-group

```js [javascript]
import { filter, toArray } from '@x-tools/multiway-tree'

const root = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

filter(root, node => node.id < 6)
toArray(root).map(node => node.id) // [1, 2, 3, 4, 5]
```

```ts [javascript]
import { filter, toArray } from '@x-tools/multiway-tree'

type TNode = { id: number, children?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

filter<TNode>(root, node => node.id < 6)
toArray<TNode>(root).map(node => node.id) // [1,2,3,4,5,6,7]
```

:::

### Specified Child Property

:::code-group

```js [javascript]
import { filter, toArray } from '@x-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

filter(root, node => node.id < 6, 'child')
toArray(root, { property: 'child' }).map(node => node.id) // [1, 2, 3, 4, 5]
```

```ts [javascript]
import { filter, toArray } from '@x-tools/multiway-tree'

type TNode = { id: number, child?: TNode[] }

const root: TNode = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

filter<TNode>(root, node => node.id < 6, 'child')
toArray<TNode>(root, { property: 'child' }).map(node => node.id) // [1,2,3,4,5,6,7]
```

:::
