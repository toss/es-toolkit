# keyBy (函数式编程)

创建一个按每个值生成键来构建对象的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, keyBy(getKey));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`keyBy`](../../reference/array/keyBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`keyBy` 会对管道中数组的每个值调用 `getKey`,并返回一个以返回键为键、原始项为值的对象。相同键的后续值会覆盖之前的值。

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
); // => { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

#### 参数

- `getKey` (`(item: T) => K`): 为每个值返回键的函数。

#### 返回值

(`(array: readonly T[]) => Record<K, T>`): 一个将 `readonly T[]` 映射为按 `getKey` 生成键的对象的函数。
