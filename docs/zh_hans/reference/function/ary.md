# ary

创建一个函数，该函数调用 `func`，最多接受 `n` 个参数，忽略任何额外的参数。

## 签名

```typescript
function ary<F extends (...args: any[]) => any>(func: F, n: number): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要限制参数数量的函数。
- `n` (`number`): 参数数量上限。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的限制参数数量的函数。

## 示例

```typescript
import { ary } from 'es-toolkit/function';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

ary(fn, 0)(1, 2, 3); // []
ary(fn, 1)(1, 2, 3); // [1]
ary(fn, 2)(1, 2, 3); // [1, 2]
ary(fn, 3)(1, 2, 3); // [1, 2, 3]
```
