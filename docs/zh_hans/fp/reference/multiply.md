# multiply (函数式编程)

创建一个将其输入乘以一个数字的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(value, multiply(multiplicand));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`multiply` 返回一个把其输入乘以 `multiplicand` 的函数。它是为组合而设计的:既可以转换流经 [`pipe`](./pipe.md) 的值,也可以作为 [`map`](./map.md) 等函数的回调。

```typescript
import { map, multiply, pipe } from 'es-toolkit/fp';

// 转换管道中的值。
pipe(3, multiply(2)); // => 6

// 作为 map 的回调使用。
pipe([1, 2, 3], map(multiply(3))); // => [3, 6, 9]
```

#### 参数

- `multiplicand` (`number`): 用于与输入相乘的数字。

#### 返回值

(`(value: number) => number`): 一个将 `value` 映射为 `value * multiplicand` 的函数。
