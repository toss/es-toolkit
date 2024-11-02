# slice

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从索引 `start` 到索引 `end` 创建 `array` 的部分数组。部分数组不包含 `end`。

与基本的 `Array.prototype.slice` 不同，它不会对稀疏数组返回密集数组。

## 签名

```typescript
function slice<T>(array: T[], start?: number, end?: number): T[];
```

### 参数

- `array` (`T[]`): 用于创建部分数组的数组。

::: info `array` 可以是 `ArrayLike<T>`、`null` 或 `undefined`。

为了确保与 lodash 的完全兼容性，`slice` 函数以以下方式处理 `array`：

- 如果 `array` 是 `ArrayLike<T>`，则会使用 `Array.from(...)` 将其转换为数组。
- 如果 `array` 是 `null` 或 `undefined`，则会将其视为一个空数组。

:::

- `start` (`number`): 开始位置。默认值为 `0`。
- `end` (`number`): 结束位置。默认值为 `array.length`。

### 返回值

(`T[]`): 从 `array` 的 `start` 到 `end` 的部分数组。

## 示例

```typescript
slice([1, 2, 3], 1, 2); // => [2]
slice(new Array(3)); // => [undefined, undefined, undefined]
```
