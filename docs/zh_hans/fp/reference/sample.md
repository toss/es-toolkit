# sample (函数式编程)

创建一个从数组中返回随机值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, sample());
```

## 用法

`sample` 从管道中的数组返回一个随机值。

```typescript
import { sample, pipe } from 'es-toolkit/fp';

const value = pipe([1, 2, 3], sample());
// value is one of 1, 2, or 3.
```

#### 参数

此函数不接收参数;请以 `sample()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T`): 一个将 `readonly T[]` 映射为一个随机值的函数。
