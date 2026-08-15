# shuffle (函数式编程)

创建一个返回数组打乱副本的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, shuffle());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`shuffle`](../../reference/array/shuffle.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`shuffle` 返回一个包含管道中数组相同值但顺序随机的新数组。它不会修改输入数组。

```typescript
import { pipe, shuffle } from 'es-toolkit/fp';

const values = pipe([1, 2, 3], shuffle());
// values contains 1, 2, and 3 in random order.
```

#### 参数

此函数不接收参数;请以 `shuffle()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为打乱副本的函数。
