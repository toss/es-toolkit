# isArrayLikeObject

::: info

出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查一个值是否是非原始的、类似数组的对象。

类似数组的对象是一个既不是 `null` 或 `undefined` 也不是函数，并且具有有效 `length` 属性的对象。

这个函数也可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `ArrayLike<unknown> & object`。

## 签名

```typescript
function isArrayLikeObject(value: unknown): value is ArrayLike<unknown> & object;
```

### 参数

- `value` (`unknown`): 要检查是否为非原始的、类似数组的对象的值。

### 返回值

(`value is ArrayLike<unknown> & object`): 如果值是非原始的、类似数组的对象，则返回 true，否则返回 false。

## 示例

```typescript
import { isArrayLikeObject } from 'es-toolkit/predicate';

console.log(isArrayLikeObject([1, 2, 3])); // true
console.log(isArrayLikeObject({ 0: 'a', length: 1 })); // true
console.log(isArrayLikeObject('abc')); // false
console.log(isArrayLikeObject(() => {})); // false
```
