# initial (函数式编程)

创建一个返回除最后一个值之外所有值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, initial());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`initial`](../../reference/array/initial.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`initial` 返回一个不包含管道中数组最后一个值的新数组。

```typescript
import { initial, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], initial()); // => [1, 2]
```

#### 参数

此函数不接收参数;请以 `initial()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为除最后一个值之外数组的函数。
