# unzipWith (函数式编程)

创建一个按位置重新分组已 zip 数组并组合每个位置的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, unzipWith(iteratee));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`unzipWith`](../../reference/array/unzipWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`unzipWith` 会从分组行中收集相同位置的值,传给 `iteratee`,并返回结果。

```typescript
import { pipe, unzipWith } from 'es-toolkit/fp';

pipe(
  [
    [1, 10],
    [2, 20],
  ],
  unzipWith((a, b) => a + b)
); // => [3, 30]
```

#### 参数

- `iteratee` (`(...args: T[]) => R`): 组合相同位置值的函数。

#### 返回值

(`(target: readonly T[][]) => R[]`): 一个将 zip 后的行映射为按位置组合结果的函数。
