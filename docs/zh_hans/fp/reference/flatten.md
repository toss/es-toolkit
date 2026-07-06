# flatten (函数式编程)

创建一个按指定深度展平嵌套数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, flatten(depth));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`flatten`](../../reference/array/flatten.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`flatten` 会将管道中的数组展平到 `depth` 深度。省略 `depth` 时只展平一层。一层展平在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { flatten, pipe } from 'es-toolkit/fp';

pipe([[1], [2, 3], [4]], flatten()); // => [1, 2, 3, 4]
```

#### 参数

- `depth` (`number, optional`): 要展平的深度。默认为 `1`。

#### 返回值

(`(array: readonly T[]) => Array<FlatArray<T[], D>>`): 一个将嵌套数组映射为展平数组的函数。
