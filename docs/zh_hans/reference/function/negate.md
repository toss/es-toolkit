# negate

创建一个函数，它会否定给定谓词函数的结果。

## 签名

```typescript
function negate<F extends (...args: unknown[]) => boolean>(func: F): F;
```

### 参数

- `func` (`F extends (args: ...Parameters) => unknown`): 要否定的函数。

### 返回值

- (`F`): 返回新的否定函数。

## 示例

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // 返回 'false'
negate(() => false)(); // 返回 'true'
```
