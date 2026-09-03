# lerp

在两个数字之间进行线性插值。

`lerp` 是 "linear interpolation(线性插值)" 的缩写。它返回从一个数字到另一个数字的路径上,位于指定比例处的数字。

```typescript
const result = lerp(a, b, t);
```

## 用法

### `lerp(a, b, t)`

当您需要从 `a` 到 `b` 的路径上位于比例 `t` 处的数字时,请使用 `lerp`。`t` 为 `0` 时返回 `a`,为 `1` 时返回 `b`,为 `0.5` 时返回两者的中点。这在动画、进度条以及将 `0` 到 `1` 之间的值映射到某个范围时非常有用。

```typescript
import { lerp } from 'es-toolkit/math';

// 0 和 100 的中点
lerp(0, 100, 0.5);
// Returns: 50

// 从 10 到 20 路径上四分之一处
lerp(10, 20, 0.25);
// Returns: 12.5

// t 为 0 时返回 a,为 1 时返回 b
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// a 可以大于 b
lerp(100, 0, 0.25);
// Returns: 75
```

结果不会被限制在范围内。当 `t` 小于 `0` 或大于 `1` 时,值会沿同一直线外推。如果需要保持在范围内,请先对 `t` 使用 `clamp`。

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// 外推到 b 之外
lerp(0, 100, 1.5);
// Returns: 150

// 限制 t 以使结果保持在 [a, b] 内
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`lerp` 是 `inverseLerp` 的反函数。将两者结合可以把数字从一个范围映射到另一个范围。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 将 0.25 从 [0, 1] 映射到 [10, 20]
lerp(10, 20, 0.25);
// Returns: 12.5

// 将 150 从 [100, 200] 映射到 [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 参数

- `a` (`number`): 起始值,`t` 为 `0` 时返回。
- `b` (`number`): 结束值,`t` 为 `1` 时返回。
- `t` (`number`): 插值比例,通常在 `0` 到 `1` 之间。

#### 返回值

(`number`): 插值后的数字。
