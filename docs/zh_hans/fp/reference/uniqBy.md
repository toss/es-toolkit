# uniqBy (函数式编程)

创建一个按映射键移除重复项的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, uniqBy(mapper));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`uniqBy`](../../reference/array/uniqBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`uniqBy` 会保留 `mapper` 返回的每个键的第一个值。它保留首次出现的顺序,并在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { pipe, uniqBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqBy(item => item.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### 参数

- `mapper` (`(item: T, index: number) => U`): 返回用于判断唯一性的键的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按键去重数组的函数。
