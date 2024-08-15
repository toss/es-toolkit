# ary

创建一个函数，该函数调用 `func`，最多接受 `n` 个参数，忽略任何额外的参数。

## 签名

```typescript
function ary<F extends (...args: any[]) => any>(
  func: F,
  n: number = func.length,
  guard?: any
): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要限制参数数量的函数。
- `n` (`number`, 可选): 参数数量上限，默认为 `func` 的参数个数。负数会被看做 `0`，小数会向下取整。
- `guard` (`any`, 可选): 用于启用作为 `map` 等方法的迭代器。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的限制参数数量的函数。

## 示例

```typescript
import { ary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

ary(fn, 2)(1, 2, 3); // [Arguments] { '0': 1, '1': 2 }
ary(fn); // [Arguments] { '0': 1, '1': 2, '2': 3 }
ary(fn, -1); // [Arguments] {}
ary(fn, 1.5); // [Arguments] { '0': 1 }
ary(fn, 2, {}); // [Arguments] { '0': 1, '1': 2, '2': 3 }
```
