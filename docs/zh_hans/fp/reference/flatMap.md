# flatMap (函数式编程)

创建一个将每个值映射为数组并将结果展平一层的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, flatMap(callback));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`flatMap`](../../reference/array/flatMap.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`flatMap` 会对管道中数组的每个值调用 `callback`,并连接返回的数组。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { flatMap, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  flatMap(value => [value, value * 10])
); // => [1, 10, 2, 20, 3, 30]
```

#### 参数

- `callback` (`(value: T, index: number) => U[]`): 将每个值映射为数组的函数。

#### 返回值

(`(array: readonly T[]) => U[]`): 一个将 `readonly T[]` 映射为 callback 结果展平数组的函数。
