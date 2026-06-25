# groupBy

创建可用于函数式管道的 data-last `groupBy` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(
  array,
  groupBy(value => value.length)
);
```

## 用法

`groupBy` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  ['a', 'bb', 'c'],
  groupBy(value => value.length)
);
// { 1: ['a', 'c'], 2: ['bb'] }
```

## API

### `groupBy(...)`

返回值: A function that accepts the piped input.
