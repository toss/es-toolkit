# rangeRight（Lodash 兼容性）

::: warning 请使用 es-toolkit 的 [rangeRight](../../math/rangeRight.md)

这个 `rangeRight` 函数由于复杂的参数处理和类型转换而运行缓慢。

请使用更快更现代的 `es-toolkit` 的 [rangeRight](../../math/rangeRight.md)。

:::

创建数字范围数组（逆序）。

```typescript
const numbers = rangeRight(start, end, step);
```

## 参考

### `rangeRight(end)`

创建从 0 到 end 以 1 递增后逆序的数组。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(4);
// Returns: [3, 2, 1, 0]

rangeRight(0);
// Returns: []

rangeRight(-4);
// Returns: [-3, -2, -1, 0]
```

### `rangeRight(start, end)`

创建从 start 到 end 以 1 递增后逆序的数组。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(1, 5);
// Returns: [4, 3, 2, 1]

rangeRight(5, 1);
// Returns: [2, 3, 4, 5] (自动以 -1 递减后逆序)

rangeRight(-2, 3);
// Returns: [2, 1, 0, -1, -2]
```

### `rangeRight(start, end, step)`

创建从 start 到 end 以 step 递增后逆序的数组。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 8, 2);
// Returns: [6, 4, 2, 0]

rangeRight(0, -4, -1);
// Returns: [-3, -2, -1, 0]

rangeRight(1, 4, 0);
// Returns: [] (step 为 0 时返回空数组)
```

小数 step 也可以使用。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 1, 0.2);
// Returns: [0.8, 0.6, 0.4, 0.2, 0]

rangeRight(1, 0, -0.25);
// Returns: [0.25, 0.5, 0.75, 1]
```

用作 iteratee 时通过 guard 对象处理。

```typescript
import { rangeRight } from 'es-toolkit/compat';

[1, 2, 3].map(rangeRight);
// Returns: [[0], [1, 0], [2, 1, 0]]
```

#### 参数

- `start` (`number`): 范围的起始值（包含）。如果没有 `end`，此值将成为 end。
- `end` (`number`, 可选): 范围的结束值（不包含）。
- `step` (`number`, 可选): 递增幅度。默认值为 1 或 -1。

#### 返回值

(`number[]`): 返回指定范围的数字数组（逆序）。
