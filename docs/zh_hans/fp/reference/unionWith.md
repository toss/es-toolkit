# unionWith (函数式编程)

创建一个使用自定义相等函数合并数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, unionWith(secondArray, areItemsEqual));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`unionWith`](../../reference/array/unionWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`unionWith` 会按顺序遍历合并后的数组,并保留按 `areItemsEqual` 尚未与已保留值匹配的第一个值。

```typescript
import { pipe, unionWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### 参数

- `secondArray` (`readonly T[]`): 要接在管道中数组之后合并的数组。
- `areItemsEqual` (`(item: T, other: T) => boolean`): 判断两个值是否相等的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按自定义相等关系合并结果的函数。
