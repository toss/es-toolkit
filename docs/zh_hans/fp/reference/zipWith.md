# zipWith

创建可用于函数式管道的 data-last `zipWith` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  zipWith([10, 20], (a, b) => a + b)
);
```

## 用法

`zipWith` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

const result = pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
);
// [11, 22]
```

## API

### `zipWith(...)`

返回值: A function that accepts the piped input.
