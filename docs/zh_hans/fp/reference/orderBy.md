# orderBy

创建可用于函数式管道的 data-last `orderBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, orderBy(['age'], ['asc']));
```

## 用法

`orderBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { name: 'a', age: 2 },
    { name: 'b', age: 1 },
  ],
  orderBy(['age'], ['asc'])
);
// [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

## API

### `orderBy(...)`

返回值: A function that accepts the piped input.
