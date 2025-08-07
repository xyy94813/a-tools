---
outline: [2, 3]
---

# groupByLevel

Returns an array. Each element of the array represents a level of the tree node.

## Types

```ts
function groupByLevel<TNode = TreeNode>(
  root: TNode,
  property?: string
): TNode[][]
```

## Example

### Common Use

:::code-group

```js [javascript]
import { groupByLevel } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

groupByLevel(root).map(level => level.map(node => node.id))
// result is:
// [
//   [1],
//   [2, 3],
//   [4, 5, 6, 7],
// ]
```

```ts [javascript]
import { groupByLevel } from '@a-tools/multiway-tree'

type TNode = { id: number, children?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

groupByLevel<TNode>(root).map(level => level.map(node => node.id))
// result is:
// [
//   [1],
//   [2, 3],
//   [4, 5, 6, 7],
// ]
```

:::

### Specified Child Property

:::code-group

```js [javascript]
import { groupByLevel } from '@a-tools/multiway-tree'

const root = {
  id: 1,
  child: [
    { id: 2, child: [{ id: 4 }, { id: 5 }] },
    { id: 3, child: [{ id: 6 }, { id: 7 }] },
  ],
}

groupByLevel(root, 'child')
  .map(level => level.map(node => node.id))
// result is:
// [
//   [1],
//   [2, 3],
//   [4, 5, 6, 7],
// ]
```

```ts [javascript]
import { groupByLevel } from '@a-tools/multiway-tree'

type TNode = { id: number, child?: TNode[] }

const root: TNode = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 4 }, { id: 5 }] },
    { id: 3, children: [{ id: 6 }, { id: 7 }] },
  ],
}

groupByLevel<TNode>(root, 'child')
  .map(level => level.map(node => node.id))
// result is:
// [
//   [1],
//   [2, 3],
//   [4, 5, 6, 7],
// ]
```

:::
