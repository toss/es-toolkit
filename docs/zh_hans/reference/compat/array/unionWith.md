# unionWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [unionWith](../../array/unionWith.md)

此 `unionWith` 函数由于复杂的处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [unionWith](../../array/unionWith.md)。

:::

合并多个数组并使用比较函数仅保留唯一值。

```typescript
const result = unionWith(...arrays, comparator);
```

## 参考

### `unionWith(...arrays, comparator)`

当您想要合并多个数组并使用自定义比较函数去除重复项以创建仅包含唯一值的新数组时,请使用 `unionWith`。保留每个值首次出现的顺序。

```typescript
import { unionWith } from 'es-toolkit/compat';

// 使用自定义比较函数
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];

unionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// 返回: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

// 简单的相等性比较
unionWith([1, 2], [2, 3], (a, b) => a === b);
// 返回: [1, 2, 3]

// 按字符串长度比较
unionWith(['ab', 'cd'], ['ef', 'gh', 'ab'], (a, b) => a.length === b.length);
// 返回: ['ab', 'ef']
```

`null` 或 `undefined` 数组会被忽略。

```typescript
import { unionWith } from 'es-toolkit/compat';

unionWith([1, 2], null, undefined, [3, 4], (a, b) => a === b);
// 返回: [1, 2, 3, 4]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要合并的数组。
- `comparator` (`(a: T, b: T) => boolean`): 确定两个值是否相等的比较函数。

#### 返回值

(`T[]`): 返回一个使用比较函数去除重复项的唯一值新数组。
