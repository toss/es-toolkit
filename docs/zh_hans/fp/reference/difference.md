# difference

创建可用于函数式管道的 data-last `difference` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, difference([2, 4]));
```

## 用法

`difference` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { difference, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], difference([2, 4]));
// [1, 3]
```

## API

### `difference(...)`

返回值: A function that accepts the piped input.
