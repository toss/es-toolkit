# flip

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

创建一个函数，该函数调用 `func` 上的方法，并将参数反转。

## 签名

```typescript
type ReverseParameters<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseParameters<Rest>, First]
  : [];

function flip<F extends (...args: any[]) => any>(func: F): (...args: ReverseParameters<Parameters<F>>) => ReturnType<F>;
```

### 参数

- `func` (`F`): 需要反转参数的函数。

### 返回值

(`(...args: ReverseParameters<Parameters<F>>) => ReturnType<F>`): 返回新的反转函数。

## 示例

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: any, b: any, c: any, d: any) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped(1, 2, 3, 4); // => [4, 3, 2, 1]
```
