# intersection (函数式编程)

创建一个保留另一个数组中也存在的值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, intersection(secondArray));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`intersection`](../../reference/array/intersection.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`intersection` 会保留管道中数组里也存在于 `secondArray` 的值,并保留管道中数组的顺序。

```typescript
import { intersection, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], intersection([2, 3, 4])); // => [2, 3]
```

#### 参数

- `secondArray` (`readonly T[]`): 包含要保留值的数组。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为也存在于 `secondArray` 的值数组的函数。
