# intersectionWith

创建可用于函数式管道的 data-last `intersectionWith` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  intersectionWith([2], (item, id) => item.id === id)
);
```

## 用法

`intersectionWith` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { intersectionWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionWith([2], (item, id) => item.id === id)
);
// [{ id: 2 }]
```

## API

### `intersectionWith(...)`

返回值: A function that accepts the piped input.
