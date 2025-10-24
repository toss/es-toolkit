# compact（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 [`compact`](../../array/compact.md)

此 `compact` 函数由于处理 `null` 和 `undefined` 值、`size` 默认值处理等原因运行较慢。

请使用 `es-toolkit` 中更快、更现代的 [compact](../../array/compact.md) 实现。

:::

从数组中移除假值。

```typescript
const compacted = compact(arr);
```

## 参考

### `compact(arr)`

当你想要从数组中移除像 `false`、`null`、`0`、`""`、`undefined` 和 `NaN` 这样的假值时,使用 `compact`。

```typescript
import { compact } from 'es-toolkit/compat';

// 移除假值
compact([0, 1, false, 2, '', 3]);
// Returns: [1, 2, 3]

compact(['a', null, 'b', undefined, 'c', NaN]);
// Returns: ['a', 'b', 'c']

// 也会移除 bigint 0
compact([0n, 1n, false, 2n]);
// Returns: [1n, 2n]

// 处理空数组
compact([]);
// Returns: []

// 当所有值都是假值时
compact([false, null, 0, '', undefined, NaN]);
// Returns: []
```

真值会保持原样。

```typescript
import { compact } from 'es-toolkit/compat';

compact([1, 'hello', true, {}, []]);
// Returns: [1, 'hello', true, {}, []]

// 非零数字
compact([0, -1, 2, -3]);
// Returns: [-1, 2, -3]
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { compact } from 'es-toolkit/compat';

compact(null);
// Returns: []

compact(undefined);
// Returns: []
```

#### 参数

- `arr` (`ArrayLike<T> | null | undefined`): 要压缩的数组。

#### 返回值

(`T[]`): 返回移除假值后的新数组。
