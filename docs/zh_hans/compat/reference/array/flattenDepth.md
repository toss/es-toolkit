# flattenDepth (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flatten`

此 `flattenDepth` 函数由于处理 `null` 或 `undefined` 而运行较慢。`es-toolkit` 的 `flatten` 函数没有这些额外处理,运行更快、更简单。

请改用更快、更现代的 `es-toolkit` 的 [flatten](../../array/flatten.md)。

:::

将数组展平到指定深度。

```typescript
const flattened = flattenDepth(array, depth);
```

## 用法

### `flattenDepth(array, depth)`

当您想将嵌套数组展平到所需深度时使用 `flattenDepth`。指定深度后,它只会将嵌套数组展平到该深度。

```typescript
import { flattenDepth } from 'es-toolkit/compat';

// 展平到深度1
flattenDepth([1, [2, [3, [4]], 5]], 1);
// Returns: [1, 2, [3, [4]], 5]

// 展平到深度2
flattenDepth([1, [2, [3, [4]], 5]], 2);
// Returns: [1, 2, 3, [4], 5]

// 如果未指定深度,默认为1
flattenDepth([1, [2, [3, [4]], 5]]);
// Returns: [1, 2, [3, [4]], 5]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { flattenDepth } from 'es-toolkit/compat';

flattenDepth(null, 2); // []
flattenDepth(undefined, 2); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要展平的数组。
- `depth` (`number`, 可选): 要展平的最大深度。默认为 `1`。

#### 返回值

(`T[]`): 返回展平到指定深度的新数组。
