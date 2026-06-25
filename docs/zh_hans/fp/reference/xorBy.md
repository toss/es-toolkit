# xorBy

创建可用于函数式管道的 data-last `xorBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
```

## 用法

`xorBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
// [{ id: 1 }, { id: 3 }]
```

## API

### `xorBy(...)`

返回值: A function that accepts the piped input.
