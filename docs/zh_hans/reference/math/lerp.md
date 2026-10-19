# lerp

计算位于两个数字 `start` 和 `stop` 之间 `fraction` 位置的值。使用线性插值(Linear interpolation)。

```typescript
const result = lerp(start, stop, fraction);
```

## 用法

### `lerp(start, stop, fraction)`

将 `start` 到 `stop` 视为一个区间,当您需要该区间内 `fraction` 位置的值时,请使用 `lerp`。`fraction` 为 `0` 时返回 `start`,为 `1` 时返回 `stop`,为 `0.5` 时返回两个数字正中间的值。这在计算动画的中间值,或将 `0` 到 `1` 的进度转换为实际数值时非常有用。

```typescript
import { lerp } from 'es-toolkit/math';

// 0 和 100 正中间的值
lerp(0, 100, 0.5);
// Returns: 50

// 10 到 20 区间四分之一位置的值
lerp(10, 20, 0.25);
// Returns: 12.5

// fraction 为 0 时返回 start,为 1 时返回 stop
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// start 可以大于 stop
lerp(100, 0, 0.25);
// Returns: 75
```

当 `fraction` 小于 `0` 或大于 `1` 时,结果也会超出 `start` 和 `stop` 之间的范围。如果只需要范围内的值,请先对 `fraction` 使用 `clamp`。

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// 结果超过了 stop
lerp(0, 100, 1.5);
// Returns: 150

// 将 fraction 限制在 0 和 1 之间,结果就会保持在 start 和 stop 之间
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

与 `inverseLerp` 结合使用,可以把数字从一个范围移到另一个范围。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 将 0.25 从 [0, 1] 移到 [10, 20]
lerp(10, 20, 0.25);
// Returns: 12.5

// 将 150 从 [100, 200] 移到 [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 参数

- `start` (`number`): 区间的起始值。`fraction` 为 `0` 时返回该值。
- `stop` (`number`): 区间的结束值。`fraction` 为 `1` 时返回该值。
- `fraction` (`number`): 表示起始与结束之间位置的插值比例,通常在 `0` 到 `1` 之间。

#### 返回值

(`number`): 位于两个数字 `start` 和 `stop` 之间 `fraction` 位置的值。
