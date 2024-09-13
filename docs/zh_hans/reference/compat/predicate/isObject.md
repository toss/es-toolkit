# isObject

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查给定的值是否为对象。对象是不属于原始类型（字符串、数字、布尔值、符号、null 或未定义）的值。

此函数测试提供的值是否为对象。如果该值是一个对象，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小到对象值。

## 签名

```typescript
function isObject(value: unknown): value is object;
```

### 参数

- `value` (`unknown`): 要检查是否为对象的值。

### 返回值

(`value is object`): 如果该值是对象类型，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = {};
const value2 = [1, 2, 3];
const value3 = () => {};
const value4 = null;

console.log(isObject(value1)); // true
console.log(isObject(value2)); // true
console.log(isObject(value3)); // true
console.log(isObject(value4)); // false
```
