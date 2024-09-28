# flip

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

反转给定函数的参数顺序。

## 签名

```typescript
function flip<F extends (...args: any[]) => any>(func: F): (...args: Reversed<Parameters<F>>) => ReturnType<F>;
```

### 参数

- `func` (`F`): 需要反转参数的函数。

### 返回值

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 返回新的反转函数。

## 示例

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped(1, 2, 3, 4); // => [4, 3, 2, 1]
```
