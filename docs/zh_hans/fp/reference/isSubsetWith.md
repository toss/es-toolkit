# isSubsetWith (函数式编程)

创建一个使用自定义相等函数检查子集关系的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, isSubsetWith(superset, areItemsEqual));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`isSubsetWith`](../../reference/array/isSubsetWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`isSubsetWith` 在管道中数组的每个值都按 `areItemsEqual` 与 `superset` 中至少一个值匹配时返回 `true`。

```typescript
import { isSubsetWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }],
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
); // => true
```

#### 参数

- `superset` (`readonly T[]`): 可能包含管道中数组所有值的数组。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 判断两个值是否相等的函数。

#### 返回值

(`(array: readonly T[]) => boolean`): 一个将 `readonly T[]` 映射为是否为子集的函数。
