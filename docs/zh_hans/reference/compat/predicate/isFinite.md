# isFinite

::: info

出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查给定的值是否是有限的数字。

此函数在 TypeScript 中也可以用作类型谓词，能够将参数的类型缩小为 `number`。

## 签名

```typescript
function isFinite(value: unknown): value is number;
```

### 参数

- `value`(`unknown`): 需要检查是否为有限数字的值。

### 返回值

(`value is number`): 如果值是有限的数字，返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = 100;
const value2 = Infinity;
const value3 = '100';

console.log(isFinite(value1)); // true
console.log(isFinite(value2)); // false
console.log(isFinite(value3)); // false
```
