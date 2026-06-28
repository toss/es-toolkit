# intersectionWith (函数式编程)

创建一个使用自定义相等函数保留值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, intersectionWith(secondArray, areItemsEqual));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`intersectionWith`](../../reference/array/intersectionWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`intersectionWith` 会在 `areItemsEqual` 对 `secondArray` 中至少一个值返回 `true` 时保留管道中数组的值。

```typescript
import { intersectionWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionWith([{ id: 2 }], (a, b) => a.id === b.id)
); // => [{ id: 2 }]
```

#### 参数

- `secondArray` (`readonly U[]`): 包含用于比较的值的数组。
- `areItemsEqual` (`(item: T, other: U) => boolean`): 判断两个值是否相等的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为被比较函数匹配的值数组的函数。
