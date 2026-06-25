# compact

创建可用于函数式管道的 data-last `compact` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, compact());
```

## 用法

`compact` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { compact, pipe } from 'es-toolkit/fp';

const result = pipe([0, 1, false, 2, '', 3], compact());
// [1, 2, 3]
```

## API

### `compact(...)`

返回值: A function that accepts the piped input.
