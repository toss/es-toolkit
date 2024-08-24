# rearg

创建一个函数，该函数根据指定的 `indexes` 重新排列参数来调用 `func`，其中第一个索引位置的参数值作为第一个参数，第二个索引位置的参数值作为第二个参数，依此类推。

## 签名

```typescript
function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indexes: Array<number | number[]>
): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 用于重新排列参数的函数。
- `indexes` (`Array<number | number[]>`): 排列后的参数索引。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的函数。

## 示例

```typescript
import { rearg } from 'es-toolkit/function';

const rearged = rearg(
  function (a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);

rearged('b', 'c', 'a');
// => ['a', 'b', 'c']
```
