# dropRight (函数式编程)

创建一个从数组末尾丢弃值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, dropRight(count));
```

## 用法

`dropRight` 会从管道中的数组末尾移除 `count` 个值。

```typescript
import { dropRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], dropRight(2)); // => [1, 2]
```

#### 参数

- `count` (`number`): 要从末尾移除的值数量。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为剩余值数组的函数。
