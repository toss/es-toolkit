# unionBy (函数式编程)

创建一个按映射键合并数组并去重的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, unionBy(secondArray, mapper));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`unionBy`](../../reference/array/unionBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`unionBy` 比较 `mapper` 返回的值。它先保留管道中数组里每个映射键的第一个值,再处理 `secondArray` 中的值。

```typescript
import { pipe, unionBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  unionBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### 参数

- `secondArray` (`readonly T[]`): 要接在管道中数组之后合并的数组。
- `mapper` (`(item: T) => U`): 返回用于判断唯一性的键的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按映射键合并结果的函数。
