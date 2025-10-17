# indexOf (Lodash 兼容性)

::: warning 请使用 `Array.prototype.indexOf` 或 `Array.prototype.findIndex`

此 `indexOf` 函数由于处理 `NaN` 的额外逻辑而运行缓慢。

如果不查找 `NaN`，请使用更快的 `Array.prototype.indexOf`。要查找 `NaN`，请使用 `Array.prototype.findIndex` 和 `Number.isNaN`。

:::

查找数组中第一个出现的值的索引。

此方法类似于 `Array.prototype.indexOf`，但也能找到 `NaN` 值。
它使用严格相等 (===) 来比较 `NaN` 以外的元素。

## 签名

```typescript
function indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
```

### 参数

- `array` (`T[]`): 要搜索的数组。

::: info `array` 可以是 `ArrayLike<T>` 或 `null` 或 `undefined`

为了确保与 lodash 的完全兼容性，`indexOf` 函数会按照以下方式处理 `array`：

- 如果 `array` 是 `ArrayLike<T>`，它会使用 `Array.from(...)` 将其转换为数组。
- 如果 `array` 是 `null` 或 `undefined`，它会被视为一个空数组。

:::

- `searchElement` (`T`): 要搜索的值。
- `fromIndex` (`number`, 选择): 开始搜索的索引。

#### 返回值

(`number`): 数组中第一个出现的值的索引（以零为基准），如果未找到该值，则返回 `-1`。

## 示例

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
