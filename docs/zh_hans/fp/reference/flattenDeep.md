# flattenDeep (函数式编程)

创建一个递归展平嵌套数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, flattenDeep());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`flattenDeep`](../../reference/array/flattenDeep.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`flattenDeep` 会递归移除管道中数组的所有嵌套数组层级。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { flattenDeep, pipe } from 'es-toolkit/fp';

pipe([1, [2, [3, [4]]]], flattenDeep()); // => [1, 2, 3, 4]
```

#### 参数

此函数不接收参数;请以 `flattenDeep()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => Array<ExtractNestedArrayType<T>>`): 一个将嵌套数组映射为深度展平数组的函数。
