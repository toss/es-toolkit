# xorWith (函数式编程)

创建一个使用自定义相等函数返回对称差的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, xorWith(secondArray, areItemsEqual));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`xorWith`](../../reference/array/xorWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`xorWith` 返回按 `areItemsEqual` 在两个数组之间无法匹配的值。

```typescript
import { pipe, xorWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### 参数

- `secondArray` (`readonly T[]`): 要与管道中的数组比较的数组。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 判断两个值是否相等的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按自定义相等关系计算的对称差的函数。
