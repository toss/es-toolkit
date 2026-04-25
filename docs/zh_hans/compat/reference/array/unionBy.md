# unionBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [unionBy](../../array/unionBy.md)

此 `unionBy` 函数由于复杂的处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [unionBy](../../array/unionBy.md)。

:::

合并多个数组并根据指定的标准仅保留唯一值。

```typescript
const result = unionBy(...arrays, iteratee);
```

## 用法

### `unionBy(...arrays, iteratee)`

当您想要合并多个数组并根据给定的标准函数去除重复项以创建仅包含唯一值的新数组时，请使用 `unionBy`。保留每个值首次出现的顺序。

```typescript
import { unionBy } from 'es-toolkit/compat';

// 通过向下取整比较小数
unionBy([2.1], [1.2, 2.3], Math.floor);
// 返回: [2.1, 1.2]

// 通过对象属性比较
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// 返回: [{ x: 1 }, { x: 2 }]

// 使用函数比较
unionBy(
  [{ id: 1, name: 'a' }],
  [
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
  ],
  item => item.id
);
// 返回: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]

// 使用部分对象比较
unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], { x: 1 });
// 返回: [{ x: 1, y: 1 }]
```

`null` 或 `undefined` 数组会被忽略。

```typescript
import { unionBy } from 'es-toolkit/compat';

unionBy([1, 2], null, undefined, [3, 4], x => x);
// 返回: [1, 2, 3, 4]
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要合并的数组。
- `iteratee` (`ValueIteratee<T>`): 确定唯一性的标准。可以是函数、属性名称、部分对象或属性-值数组。

#### 返回值

(`T[]`): 返回一个根据指定标准去除重复项的唯一值新数组。
