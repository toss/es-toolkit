# uniqWith (函数式编程)

创建一个使用自定义相等函数移除重复项的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, uniqWith(areItemsEqual));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`uniqWith`](../../reference/array/uniqWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`uniqWith` 会保留按 `areItemsEqual` 尚未与已保留值匹配的第一个值。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### 参数

- `areItemsEqual` (`(item: T, other: T) => boolean`): 判断两个值是否相等的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为按自定义相等关系去重数组的函数。
