# keyBy

创建可用于函数式管道的 data-last `keyBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  keyBy(item => item.id)
);
```

## 用法

`keyBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
);
// { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

## API

### `keyBy(...)`

返回值: A function that accepts the piped input.
