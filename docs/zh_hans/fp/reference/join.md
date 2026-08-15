# join (函数式编程)

创建一个将数组值连接成字符串的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, join(separator));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`join` 会使用 `separator` 连接管道中数组的值并转换为字符串。省略 `separator` 时使用逗号。

```typescript
import { join, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], join('-')); // => 'a-b-c'

pipe(['a', 'b', 'c'], join()); // => 'a,b,c'
```

#### 参数

- `separator` (`string, optional`): 插入到值之间的字符串。默认为 `,`。

#### 返回值

(`(array: readonly T[]) => string`): 一个将 `readonly T[]` 映射为连接后字符串的函数。
