# max (Lodash 兼容性)

::: warning 请使用 `Math.max`

这个 `max` 函数由于额外的函数调用和 `null`/`undefined` 处理会运行较慢。

请使用更快、更现代的 `Math.max(...array)`。

:::

在数组中查找最大值。

```typescript
const result = max(items);
```

## 用法

### `max(items?)`

当您想要在数组中查找最大值时，请使用 `max`。

```typescript
import { max } from 'es-toolkit/compat';

// 数字数组中的最大值
max([1, 2, 3]);
// Returns: 3

max([10, 5, 8, 20]);
// Returns: 20

// 字符串数组中的最大值（按字典序）
max(['a', 'b', 'c']);
// Returns: 'c'

max(['apple', 'banana', 'cherry']);
// Returns: 'cherry'

// 空数组或 null/undefined
max([]);
// Returns: undefined

max(null);
// Returns: undefined

max(undefined);
// Returns: undefined
```

负数也能正确处理。

```typescript
import { max } from 'es-toolkit/compat';

max([-1, -5, -3]);
// Returns: -1

max([0, -2, 5, -10]);
// Returns: 5
```

#### 参数

- `items` (`ArrayLike<T> | null | undefined`, 可选): 要查找最大值的数组。

#### 返回值

(`T | undefined`): 返回数组中的最大值。如果数组为空或为 null/undefined，则返回 undefined。
