# reverse (函数式编程)

创建一个返回数组反转副本的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, reverse());
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`reverse` 返回一个按相反顺序包含管道中数组值的新数组。它不会修改输入数组。

```typescript
import { pipe, reverse } from 'es-toolkit/fp';

const array = [1, 2, 3];

pipe(array, reverse()); // => [3, 2, 1]
array; // => [1, 2, 3]
```

#### 参数

此函数不接收参数;请以 `reverse()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为反转副本的函数。
