# add (函数式编程)

创建一个将一个数字加到其输入上的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(value, add(addend));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`add` 返回一个把 `addend` 加到其输入上的函数。它是为组合而设计的:既可以转换流经 [`pipe`](./pipe.md) 的值,也可以作为 [`map`](./map.md) 等函数的回调。

```typescript
import { add, map, pipe } from 'es-toolkit/fp';

// 转换管道中的值。
pipe(3, add(2)); // => 5

// 作为 map 的回调使用。
pipe([1, 2, 3], map(add(10))); // => [11, 12, 13]
```

#### 参数

- `addend` (`number`): 用于加到输入上的数字。

#### 返回值

(`(value: number) => number`): 一个将 `value` 映射为 `value + addend` 的函数。
