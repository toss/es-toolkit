# forEach (函数式编程)

创建一个对每个值运行回调并返回输入数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, forEach(callback));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`forEach` 适合在管道中插入副作用步骤。它会对每个值调用 `callback`,并把原数组继续传递下去。在 [`pipe`](./pipe.md) 中,当相邻惰性操作可以提前停止时,它支持惰性求值。

```typescript
import { forEach, pipe } from 'es-toolkit/fp';

const values: number[] = [];

pipe(
  [1, 2, 3],
  forEach(value => values.push(value))
); // => [1, 2, 3]
values; // => [1, 2, 3]
```

#### 参数

- `callback` (`(value: T, index: number) => void`): 要对每个值运行的函数。

#### 返回值

(`(array: readonly T[]) => readonly T[]`): 一个在运行 callback 后返回同一个数组的函数。
