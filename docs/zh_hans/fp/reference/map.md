# map (函数式编程)

创建一个转换数组中每个元素的函数,等价于 `Array.prototype.map`。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, map(callbackfn));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`map` 通过对每个元素调用 `callbackfn` 来构建一个新数组。它**支持惰性求值**:在 [`pipe`](./pipe.md) 中,它会与相邻的惰性操作融合,因此位于末尾的 `take` 可以提前结束工作。

```typescript
import { map, pipe } from 'es-toolkit/fp';

// 转换每个元素。
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// 索引作为第二个参数提供。
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// 元素的类型可以改变。
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### 参数

- `callbackfn` (`(value: T, index: number) => U`): 对每个元素调用的函数;其返回值会成为输出数组中对应的元素。

#### 返回值

(`(array: readonly T[]) => U[]`): 一个将 `readonly T[]` 映射为新 `U[]` 的函数。
