# xorBy (函数式编程)

创建一个按映射键返回对称差的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, xorBy(secondArray, mapper));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`xorBy`](../../reference/array/xorBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`xorBy` 比较 `mapper` 返回的值,并返回映射键只存在于一个数组中的值。

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### 参数

- `secondArray` (`readonly T[]`): 要与管道中的数组比较的数组。
- `mapper` (`(item: T) => U`): 返回比较键的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按键计算的对称差的函数。
