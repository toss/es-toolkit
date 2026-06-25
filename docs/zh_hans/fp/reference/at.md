# at (函数式编程)

创建一个返回指定索引处值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, at(indices));
```

## 用法

`at` 会从管道中的数组读取 `indices` 中每个索引对应的值。负数索引会像 `Array.prototype.at` 一样从末尾开始计数。

```typescript
import { at, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], at([0, -1])); // => ['a', 'c']
```

#### 参数

- `indices` (`number[]`): 要从管道中的数组读取的索引。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为所选值数组的函数。
