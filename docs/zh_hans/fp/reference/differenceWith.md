# differenceWith

创建可用于函数式管道的 data-last `differenceWith` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  differenceWith([2], (item, id) => item.id === id)
);
```

## 用法

`differenceWith` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { differenceWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  differenceWith([2], (item, id) => item.id === id)
);
// [{ id: 1 }]
```

## API

### `differenceWith(...)`

返回值: A function that accepts the piped input.
