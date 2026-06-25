# partition

创建可用于函数式管道的 data-last `partition` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  partition(value => value % 2 === 0)
);
```

## 用法

`partition` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { partition, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
);
// [[2, 4], [1, 3]]
```

## API

### `partition(...)`

返回值: A function that accepts the piped input.
