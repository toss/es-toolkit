# isSubset (函数式编程)

创建一个检查管道中的数组是否为另一个数组子集的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, isSubset(superset));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`isSubset`](../../reference/array/isSubset.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`isSubset` 在管道中数组的每个值都存在于 `superset` 中时返回 `true`。

```typescript
import { isSubset, pipe } from 'es-toolkit/fp';

pipe([1, 2], isSubset([1, 2, 3])); // => true

pipe([1, 4], isSubset([1, 2, 3])); // => false
```

#### 参数

- `superset` (`readonly T[]`): 可能包含管道中数组所有值的数组。

#### 返回值

(`(array: readonly T[]) => boolean`): 一个将 `readonly T[]` 映射为是否为子集的函数。
