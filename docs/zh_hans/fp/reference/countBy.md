# countBy

创建可用于函数式管道的 data-last `countBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  countBy(value => value.length)
);
```

## 用法

`countBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  ['a', 'bb', 'c'],
  countBy(value => value.length)
);
// { 1: 2, 2: 1 }
```

## API

### `countBy(...)`

返回值: A function that accepts the piped input.
