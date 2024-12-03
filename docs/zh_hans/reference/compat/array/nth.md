# nth

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

获取数组中索引为 `n` 的元素。如果 `n` 为负数，则返回倒数第 n 个元素。

## 签名

```typescript
function nth<T>(array: ArrayLike<T> | null | undefined, n: number): T | undefined;
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要查询的数组。
- `n` (`number`): 要返回的元素的索引。

### 返回值

(`T | undefined`): 返回数组中第 n 个元素。

## 示例

```typescript
nth([1, 2, 3], 1); // => 2
nth([1, 2, 3], -1); // => 3
```