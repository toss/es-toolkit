# takeRight (函数式编程)

创建一个从数组末尾获取值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, takeRight(count));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`takeRight`](../../reference/array/takeRight.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`takeRight` 返回管道中数组末尾的 `count` 个值。

```typescript
import { pipe, takeRight } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], takeRight(2)); // => [3, 4]
```

#### 参数

- `count` (`number`): 要从末尾获取的值数量。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为末尾 `count` 个值的函数。
