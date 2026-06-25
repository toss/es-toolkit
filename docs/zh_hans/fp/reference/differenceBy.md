# differenceBy (函数式编程)

创建一个按映射键排除值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, differenceBy(secondArray, mapper));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`differenceBy`](../../reference/array/differenceBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`differenceBy` 比较 `mapper` 返回的值。当管道中数组值的映射键不存在于 `secondArray` 时,该值会被保留。

```typescript
import { differenceBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  differenceBy([2], value => (typeof value === 'number' ? value : value.id))
); // => [{ id: 1 }]
```

#### 参数

- `secondArray` (`readonly U[]`): 包含要按映射键排除的值的数组。
- `mapper` (`(item: T | U) => unknown`): 返回比较键的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为键不存在于 `secondArray` 的值数组的函数。
