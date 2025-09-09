# reverse

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

在原位置反转数组的元素。

此函数在原位置反转数组的元素，直接修改原数组。如果输入为 `null` 或 `undefined`，则返回该输入值。

## 签名

```typescript
function reverse<T>(array: T[]): T[];
```

### 参数

- `array` (`T[]`): 要反转的数组。

### 返回值

(`T[]`): 反转后的数组。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] （原数组已被修改）

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
