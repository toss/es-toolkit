# lastIndexOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

查找数组中最后一个出现的值的索引。

此方法类似于 `Array.prototype.lastIndexOf`，但也能找到 `NaN` 值。
它使用严格相等 (===) 来比较 `NaN` 以外的元素。

## 签名

```typescript
function lastIndexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
```

### 参数

- `array` (`T[]`): 要搜索的数组。

::: info `array` 可以是 `ArrayLike<T>` 或 `null` 或 `undefined` 。

为了确保与 lodash 的完全兼容性，`lastIndexOf` 函数会按照以下方式处理 `array`：

- 如果 `array` 是 `ArrayLike<T>`，它会使用 `Array.from(...)` 将其转换为数组。
- 如果 `array` 是 `null` 或 `undefined`，它会被视为一个空数组。

:::

- `searchElement` (`T`): 要搜索的值。
- `fromIndex` (`number`, 可选): 开始搜索的索引。

### 返回

(`number`): 数组中最后一个出现的值的索引（以零为基准），如果未找到该值，则返回 `-1`。

## 示例

```typescript
const array = [1, 2, 3, NaN, 1];
lastIndexOf(array, 1); // => 4
lastIndexOf(array, NaN); // => 3
```
