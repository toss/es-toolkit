# toArray

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将值转换为数组.

## 签名

```typescript
function toArray(value?: unknown): any[];
```

### 参数

- `value` (`unknown`): 要转换的值.

### 返回值

(`any[]`): 返回转换后的数组.

## 示例

```typescript
toArray({ a: 1, b: 2 }); // => returns [1,2]
toArray('abc'); // => returns ['a', 'b', 'c']
toArray(1); // => returns []
toArray(null); // => returns []
```
