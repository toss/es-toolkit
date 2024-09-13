# unary

创建一个函数，该函数最多接受一个参数，忽略任何额外的参数。

## 签名

```typescript
function unary<F extends (...args: any[]) => any>(func: F): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要限制参数数量的函数。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的限制参数数量的函数。

## 示例

```typescript
import { unary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

unary(fn)(1, 2, 3); // [Arguments] { '0': 1 }
```
