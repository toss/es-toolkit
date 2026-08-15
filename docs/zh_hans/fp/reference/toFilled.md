# toFilled (函数式编程)

创建一个返回数组填充副本的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, toFilled(value, start, end));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`toFilled`](../../reference/array/toFilled.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`toFilled` 会在管道中数组的副本中,从 `start` 到 `end` 之前的位置填入 `value`。它遵循 `Array.prototype.fill` 的索引语义,且不会修改输入数组。

```typescript
import { pipe, toFilled } from 'es-toolkit/fp';

const array = [1, 2, 3, 4];

pipe(array, toFilled(0, 1, 3)); // => [1, 0, 0, 4]
array; // => [1, 2, 3, 4]
```

#### 参数

- `value` (`U`): 要写入返回数组的值。
- `start` (`number, optional`): 开始索引。默认为 `0`。
- `end` (`number, optional`): 结束索引。默认为数组长度。

#### 返回值

(`(array: readonly T[]) => Array<T | U>`): 一个将 `readonly T[]` 映射为填充副本的函数。
