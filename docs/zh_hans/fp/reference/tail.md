# tail (函数式编程)

创建一个返回除第一个值之外所有值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, tail());
```

## 用法

`tail` 返回一个不包含管道中数组第一个值的新数组。

```typescript
import { tail, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### 参数

此函数不接收参数;请以 `tail()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为除第一个值之外数组的函数。
