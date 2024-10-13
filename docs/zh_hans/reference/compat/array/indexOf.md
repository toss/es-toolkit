# indexOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

查找数组中第一个出现的值的索引。

此方法类似于 `Array.prototype.indexOf`，但也能找到 `NaN` 值。
它使用严格相等 (===) 来比较 `NaN` 以外的元素。

## 签名

```typescript
function indexOf<T>(array: ArrayLike<T> | null | undefined, searchElement: T, fromIndex?: number): number;
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要搜索的数组。
- `searchElement` (`T`): 要搜索的值。
- `fromIndex` (`number`, 可选): 开始搜索的索引。

### 返回

(`number`): 数组中第一个出现的值的索引（以零为基准），如果未找到该值，则返回 `-1`。

## 示例

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
