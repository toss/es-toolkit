# length (函数式编程)

创建一个返回数组长度的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, length());
```

## 用法

`length` 返回管道中数组包含的值数量。

```typescript
import { length, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], length()); // => 3
```

#### 参数

此函数不接收参数;请以 `length()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => number`): 一个将 `readonly T[]` 映射为其长度的函数。
