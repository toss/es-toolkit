# isArrayLike

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查一个值是否是类似数组的对象。

类似数组的对象是一个既不是 `null` 或 `undefined` 也不是函数，并且具有有效 `length` 属性的对象。

这个函数也可以作为 TypeScript 中的类型断言，将参数的类型缩小到类似数组的对象。

## 签名

```typescript
function isArrayLike(value: unknown): value is ArrayLike<unknown>;
```

### 参数

- `value` (`unknown`): 要检查是否为类似数组的对象的值。

### 返回值

(`value is ArrayLike<unknown>`): 如果值是类似数组的对象则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isArrayLike } from 'es-toolkit/compat';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike({ 0: 'a', length: 1 })); // true
console.log(isArrayLike({})); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false
```
