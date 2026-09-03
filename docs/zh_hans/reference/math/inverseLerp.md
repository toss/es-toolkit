# inverseLerp

计算一个数字位于另外两个数字之间的位置,以 `0` 到 `1` 之间的比例表示。

这是 `lerp` 的反函数,也相当于将数字按范围进行归一化。

```typescript
const t = inverseLerp(a, b, value);
```

## 用法

### `inverseLerp(a, b, value)`

当您想知道一个数字在范围中的位置时,请使用 `inverseLerp`。`value` 等于 `a` 时返回 `0`,等于 `b` 时返回 `1`,位于两者中点时返回 `0.5`。这在将滚动位置、滑块值或测量值转换为进度比例时非常有用。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50 位于 0 和 100 的中点
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5 位于从 10 到 20 路径的四分之一处
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// value 等于 a 时返回 0,等于 b 时返回 1
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// a 可以大于 b
inverseLerp(100, 0, 75);
// Returns: 0.25
```

结果不会被限制在 `[0, 1]` 内。当 `value` 在范围之外时,结果会小于 `0` 或大于 `1`。如果需要保持在 `[0, 1]` 内,请对结果使用 `clamp`。

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// 超出范围末端
inverseLerp(0, 100, 150);
// Returns: 1.5

// 将结果限制在 [0, 1] 内
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

当 `a` 和 `b` 是同一个数字时,不存在有意义的比例,因此返回 `0` 而不是除以零。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 范围为空
inverseLerp(5, 5, 5);
// Returns: 0
```

`inverseLerp` 是 `lerp` 的反函数。将两者结合可以把数字从一个范围映射到另一个范围。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 将 150 从 [100, 200] 映射到 [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 参数

- `a` (`number`): 范围的起点,映射到 `0`。
- `b` (`number`): 范围的终点,映射到 `1`。
- `value` (`number`): 要在范围中定位的数字。

#### 返回值

(`number`): `value` 在从 `a` 到 `b` 的路径上所处的比例。
