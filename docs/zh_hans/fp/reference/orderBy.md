# orderBy (函数式编程)

创建一个按条件和排序方向对对象排序的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, orderBy(criteria, orders));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`orderBy`](../../reference/array/orderBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`orderBy` 会按每个条件依次对管道中的数组排序。每个排序方向控制对应条件是升序还是降序。

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const users = [
  { name: 'a', age: 2 },
  { name: 'b', age: 1 },
];

pipe(users, orderBy(['age'], ['asc'])); // => [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

#### 参数

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 用于比较的对象键和/或选择器函数。
- `orders` (`Array<'asc' | 'desc'>`): 每个条件的排序方向。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为新的已排序数组的函数。
