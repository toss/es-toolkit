# isNumber

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查给定值是否为数字。

此函数还可以作为TypeScript中的类型谓词，将参数的类型缩小为`number`。

## 签名

```typescript
function isNumber(value?: unknown): value is number;
```

### 参数

- `value` (`unknown`): 要检查是否为数字的值。

### 返回值

(`value is number`): 如果`value`是数字，则返回`true`，否则返回`false`。

## 示例

```typescript
const value1 = 123;
const value2 = 'abc';
const value3 = true;

console.log(isNumber(value1)); // true
console.log(isNumber(value2)); // false
console.log(isNumber(value3)); // false
```
