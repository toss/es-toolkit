# zipObject (函数式编程)

创建一个根据键和值构建对象的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, zipObject(values));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`zipObject`](../../reference/array/zipObject.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`zipObject` 使用管道中的数组作为键,并将每个键与 `values` 中相同索引处的值配对。

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

pipe(['a', 'b'] as const, zipObject([1, 2])); // => { a: 1, b: 2 }
```

#### 参数

- `values` (`readonly V[]`): 按索引分配给管道中数组键的值。

#### 返回值

(`(keys: readonly P[]) => Record<P, V>`): 一个将键数组映射为由 `values` 构建对象的函数。
