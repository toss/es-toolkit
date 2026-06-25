# uniqWith

创建可用于函数式管道的 data-last `uniqWith` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  uniqWith((a, b) => a.id === b.id)
);
```

## 用法

`uniqWith` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
);
// [{ id: 1 }, { id: 2 }]
```

## API

### `uniqWith(...)`

返回值: A function that accepts the piped input.
