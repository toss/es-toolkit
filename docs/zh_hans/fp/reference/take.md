# take (函数式编程)

创建一个返回数组前 `count` 个元素的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, take(count));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`take`](../../reference/array/take.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`take` 返回前 `count` 个元素。如果 `count` 大于数组长度,则返回整个数组。当 `count` 为非负整数时,它**支持惰性求值**:在 [`pipe`](./pipe.md) 中,一旦收集到 `count` 个元素就会结束遍历,因此前面的惰性操作不会再处理剩余的输入。

```typescript
import { map, pipe, take } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], take(3)); // => [1, 2, 3]

// `count` 大于长度时返回整个数组。
pipe([1, 2, 3], take(5)); // => [1, 2, 3]

// 提前终止:`map` 只运行三次。
pipe([1, 2, 3, 4, 5], map(expensiveTransform), take(3));
```

#### 参数

- `count` (`number`): 从数组开头取出的元素数量。负的 `count` 遵循 `es-toolkit` 的 `take`,改为从末尾丢弃元素。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为最多包含 `count` 个元素的新 `T[]` 的函数。
