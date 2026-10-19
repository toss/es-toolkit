# inverseLerp

计算数字 `value` 位于两个数字 `start` 和 `stop` 之间的哪个位置,以 `0` 到 `1` 之间的比例表示。这是 `lerp` 的反向运算。

```typescript
const fraction = inverseLerp(start, stop, value);
```

## 用法

### `inverseLerp(start, stop, value)`

将 `start` 到 `stop` 视为一个区间,当您想知道 `value` 在该区间的哪个位置时,请使用 `inverseLerp`。`value` 等于 `start` 时返回 `0`,等于 `stop` 时返回 `1`,位于正中间时返回 `0.5`。这在将滚动位置或滑块值转换为 `0` 到 `1` 的进度时非常有用。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50 位于 0 和 100 的正中间
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5 位于 10 到 20 区间的四分之一位置
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// value 等于 start 时返回 0,等于 stop 时返回 1
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// start 可以大于 stop
inverseLerp(100, 0, 75);
// Returns: 0.25
```

当 `value` 超出 `start` 和 `stop` 之间的范围时,结果也会小于 `0` 或大于 `1`。如果只需要 `0` 到 `1` 之间的比例,请对结果使用 `clamp`。

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// 传入超过 stop 的值会得到大于 1 的比例
inverseLerp(0, 100, 150);
// Returns: 1.5

// 将结果限制在 0 和 1 之间
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

当 `start` 和 `stop` 是同一个数字时,没有可以衡量位置的区间,因此返回 `0`。

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 区间长度为 0
inverseLerp(5, 5, 5);
// Returns: 0
```

与 `lerp` 结合使用,可以把数字从一个范围移到另一个范围。

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// 将 150 从 [100, 200] 移到 [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### 参数

- `start` (`number`): 区间的起始值。`value` 等于该值时返回 `0`。
- `stop` (`number`): 区间的结束值。`value` 等于该值时返回 `1`。
- `value` (`number`): 要在区间内定位的数字。

#### 返回值

(`number`): `value` 位于 `start` 和 `stop` 之间的位置,以 `0` 到 `1` 之间的比例表示。
