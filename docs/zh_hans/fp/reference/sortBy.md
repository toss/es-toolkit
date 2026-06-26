# sortBy (函数式编程)

创建一个按一个或多个条件对对象数组进行升序排序的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, sortBy(criteria));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`sortBy`](../../reference/array/sortBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`sortBy` 将对象数组按升序排序。每个条件可以是对象的某个键,也可以是一个返回用于比较的值的函数。当两个元素在某个条件上相等时,会用下一个条件来决定先后。该排序是稳定的,并且不会修改输入。

```typescript
import { pipe, sortBy } from 'es-toolkit/fp';

const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

// 按单个键排序。
pipe(users, sortBy(['age']));
// => [{ user: 'bar', age: 7 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }, { user: 'bar', age: 29 }]

// 按多个条件排序,相等时用下一个条件决定先后。
pipe(users, sortBy(['user', 'age']));
// => [{ user: 'bar', age: 7 }, { user: 'bar', age: 29 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }]

// 可以使用选择器函数来代替键。
pipe(users, sortBy([item => item.age]));
```

#### 参数

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 用于比较的对象键和/或选择器函数,按顺序依次应用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为排序后新 `T[]` 的函数。
