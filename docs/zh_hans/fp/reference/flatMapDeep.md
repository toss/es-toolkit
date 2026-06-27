# flatMapDeep (函数式编程)

创建一个映射每个值并深度展平结果的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, flatMapDeep(iteratee));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`flatMapDeep`](../../reference/array/flatMapDeep.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`flatMapDeep` 会对管道中数组的每个值调用 `iteratee`,并递归展平返回的数组。

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
); // => [1, 1, 2, 2]
```

#### 参数

- `iteratee` (`(item: T, index: number) => U`): 在深度展平前映射每个值的函数。

#### 返回值

(`(array: readonly T[]) => Array<ExtractNestedArrayType<U>>`): 一个将 `readonly T[]` 映射为深度展平数组的函数。
