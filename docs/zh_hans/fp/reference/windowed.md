# windowed

创建可用于函数式管道的 data-last `windowed` 操作符。与 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, windowed(2));
```

## 用法

`windowed` 返回一个接收 `pipe` 中流动值的函数。这样数据保留为 `pipe` 的第一个参数，操作符配置则写在对应的转换步骤旁边。

```typescript
import { pipe, windowed } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], windowed(2));
// [[1, 2], [2, 3], [3, 4]]
```

## API

### `windowed(...)`

返回值: A function that accepts the piped input.
