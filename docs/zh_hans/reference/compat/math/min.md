# min (Lodash 兼容性)

::: warning 请使用 `Math.min`

这个 `min` 函数由于额外的函数调用和 null/undefined 处理会运行较慢。

请使用更快、更现代的 `Math.min(...array)`。

:::

在数组中查找最小值。

```typescript
const result = min(items);
```

## 参考

### `min(items?)`

当您想要在数组中查找最小值时，请使用 `min`。

```typescript
import { min } from 'es-toolkit/compat';

// 数字数组中的最小值
min([3, 1, 4, 1, 5, 9]);
// Returns: 1

min([10, 5, 8, 20]);
// Returns: 5

// 字符串数组中的最小值（按字典序）
min(['c', 'a', 'b']);
// Returns: 'a'

min(['cherry', 'apple', 'banana']);
// Returns: 'apple'

// 空数组或 null/undefined
min([]);
// Returns: undefined

min(null);
// Returns: undefined

min(undefined);
// Returns: undefined
```

负数也能正确处理。

```typescript
import { min } from 'es-toolkit/compat';

min([0, -3, 2, 8, 7]);
// Returns: -3

min([-1, -5, -3]);
// Returns: -5
```

#### 参数

- `items` (`ArrayLike<T> | null | undefined`, 可选): 要查找最小值的数组。

#### 返回值

(`T | undefined`): 返回数组中的最小值。如果数组为空或为 null/undefined，则返回 undefined。