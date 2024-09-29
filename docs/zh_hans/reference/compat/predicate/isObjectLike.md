# isObjectLike

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查一个值是否类似对象。

如果一个值的类型是对象并且它不为 `null`，那么它就是类似对象的。

这个函数还可以在 TypeScript 中用作类型谓词，将参数的类型缩小到类似对象的值。

## 签名

```typescript
function isObjectLike(value: unknown): value is object;
```

### 参数

- `value` (`unknown`): 要检查是否为类对象的值。

### 返回值

(`value is object`): 如果该值是类对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isObjectLike } from 'es-toolkit/compat';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
console.log(isObjectLike(value5)); // false
```
