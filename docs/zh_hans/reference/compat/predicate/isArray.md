# isArray

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查给定的值是否为数组。

该函数测试提供的值是否为数组。

如果值为数组，则返回 `true`，否则返回 `false`。

在 TypeScript 中，该函数还可以作为类型谓词，将参数的类型缩小为数组。

## 签名

```typescript
function isArray(value?: unknown): value is any[];
```

### 参数

- `value` (`unknown`): 检查是否为数组的值。

### 返回值

(`value is any[]`): 如果值为数组，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
