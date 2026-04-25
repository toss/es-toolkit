# slice（Lodash 兼容性）

::: warning 使用 `Array.prototype.slice`

此 `slice` 函数由于 `null` 或 `undefined` 处理和稀疏数组的特殊处理而运行缓慢。JavaScript 的原生 `Array.prototype.slice` 方法更快且更标准化。

请使用更快、更现代的 `Array.prototype.slice`。

:::

切割数组的一部分以创建新数组。

```typescript
const sliced = slice(array, start, end);
```

## 用法

### `slice(array, start, end)`

当只需要数组的特定部分时，使用 `slice`。它创建一个新数组，包含从开始位置到结束位置之前的元素。

```typescript
import { slice } from 'es-toolkit/compat';

// 从索引1到2进行切割
slice([1, 2, 3, 4], 1, 3);
// 返回值：[2, 3]

// 使用负索引
slice([1, 2, 3, 4], -2);
// 返回值：[3, 4]

// 仅指定开始位置
slice([1, 2, 3, 4], 2);
// 返回值：[3, 4]
```

`null` 或 `undefined` 作为空数组处理。

```typescript
import { slice } from 'es-toolkit/compat';

slice(null); // []
slice(undefined); // []
```

处理稀疏数组时，空槽会用 `undefined` 填充。

```typescript
import { slice } from 'es-toolkit/compat';

const sparse = new Array(3);
sparse[1] = 'b';
slice(sparse);
// 返回值：[undefined, 'b', undefined]
```

使用负索引会从数组末尾开始计算。

```typescript
import { slice } from 'es-toolkit/compat';

slice([1, 2, 3, 4, 5], -3, -1);
// 返回值：[3, 4]
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`)：要切割的数组。
- `start` (`number`，可选）：开始位置。负值从末尾计算。默认值为 `0`。
- `end` (`number`，可选）：结束位置（不包含）。负值从末尾计算。默认值为数组的长度。

#### 返回值

(`T[]`)：返回包含从 `start` 到 `end` 之前的元素的新数组。
