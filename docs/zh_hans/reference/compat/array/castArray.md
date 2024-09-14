# castArray

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

如果值不是数组，则将其转换为数组。

## 签名

```typescript
function castArray<T>(value?: T | T[]): T[];
```

### 参数

- `value` (`T | readonly T[]`): 要转换为数组的值。

### 返回值

(`T[]`): 包含输入值的数组（如果它不是数组），或者原始数组（如果它是数组）。

## 示例

```typescript
const arr1 = castArray(1);
// Returns: [1]

const arr2 = castArray([1]);
// Returns: [1]

const arr3 = castArray({ a: 1 });
// Returns: [{'a': 1}]

const arr4 = castArray(null);
// Returns: [null]

const arr5 = castArray(undefined);
// Returns: [undefined]

const arr6 = castArray();
// Returns: []
```
