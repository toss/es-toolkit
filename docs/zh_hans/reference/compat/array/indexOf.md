# indexOf (Lodash 兼容性)

::: warning 请使用 `Array.prototype.indexOf` 或 `Array.prototype.findIndex`

此 `indexOf` 函数由于处理 `NaN` 的额外逻辑而运行缓慢。

如果不查找 `NaN`，请使用更快的 `Array.prototype.indexOf`。要查找 `NaN`，请使用 `Array.prototype.findIndex` 和 `Number.isNaN`。

:::

查找数组中第一个出现的值的索引。

```typescript
const index = indexOf(array, searchElement, fromIndex);
```

## 参考

### `indexOf(array, searchElement, fromIndex?)`

与 `Array.prototype.indexOf` 几乎相同，但可以找到 `NaN` 值。当您需要在数组中查找特定值的位置时使用此方法。

```typescript
import { indexOf } from 'es-toolkit/compat';

// 在数字数组中查找元素
const array = [1, 2, 3, 4];
indexOf(array, 3); // => 2

// 查找 NaN 值（Array.prototype.indexOf 无法找到）
const arrayWithNaN = [1, 2, NaN, 4];
indexOf(arrayWithNaN, NaN); // => 2
```

可以从特定索引开始搜索。

```typescript
import { indexOf } from 'es-toolkit/compat';

const array = [1, 2, 3, 1, 2, 3];
indexOf(array, 2, 2); // => 4（从索引 2 开始搜索）
```

`null` 或 `undefined` 会被视为空数组。

```typescript
import { indexOf } from 'es-toolkit/compat';

indexOf(null, 1); // => -1
indexOf(undefined, 1); // => -1
```

#### 参数

- `array` (`T[]`): 要搜索的数组。

::: info `array` 可以是 `ArrayLike<T>` 或 `null` 或 `undefined`

为了确保与 lodash 的完全兼容性，`indexOf` 函数会按照以下方式处理 `array`：

- 如果 `array` 是 `ArrayLike<T>`，它会使用 `Array.from(...)` 将其转换为数组。
- 如果 `array` 是 `null` 或 `undefined`，它会被视为一个空数组。

:::

- `searchElement` (`T`): 要查找的值。
- `fromIndex` (`number`, 可选): 开始搜索的索引。如果为负数，则从数组末尾开始计算。默认值为 `0`。

#### 返回值

(`number`): 返回数组中第一个匹配给定值的元素的索引。如果未找到匹配元素，则返回 `-1`。
