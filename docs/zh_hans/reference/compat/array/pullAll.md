# pullAll

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从数组中删除所有指定的值。

此函数会就地更改 `arr`。
如果希望在不修改原始数组的情况下删除值，请使用 `difference`。

## 签名

```typescript
function pullAll<T>(arr: T[], valuesToRemove: ArrayLike<T>): T[];
```

### 参数

- `arr` (`T[]`): 要修改的数组。
- `valuesToRemove` (`ArrayLike<T>`): 要从数组中删除的值。

### 返回值

(`T[]`): 删除了指定值后的修改数组。

## 示例

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pullAll(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
