# minBy

创建可用于函数式管道的 data-last `minBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  minBy(item => item.score)
);
```

## 用法

`minBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { minBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ score: 1 }, { score: 3 }, { score: 2 }],
  minBy(item => item.score)
);
// { score: 1 }
```

## API

### `minBy(...)`

返回值: A function that accepts the piped input.
