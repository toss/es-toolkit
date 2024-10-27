# rearg

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

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
import { rearg } from 'es-toolkit/compat';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const rearrangedGreet = rearg(greet, 1, 0);
console.log(rearrangedGreet('World', 'Hello')); // Output: "Hello, World!"
```
