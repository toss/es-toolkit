# xor (函数式编程)

创建一个返回只出现在两个数组之一中的值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, xor(secondArray));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`xor`](../../reference/array/xor.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`xor` 返回管道中数组与 `secondArray` 的对称差,且不包含重复值。

```typescript
import { pipe, xor } from 'es-toolkit/fp';

pipe([1, 2, 3], xor([2, 3, 4])); // => [1, 4]
```

#### 参数

- `secondArray` (`readonly T[]`): 要与管道中的数组比较的数组。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为对称差的函数。
