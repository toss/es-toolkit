# clamp

将数字限制在指定范围内。

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

## 用法

### `clamp(value, maximum)`

当您想将数字限制为不超过给定最大值时,请使用 `clamp`。如果值超过最大值,则被限制为最大值;否则,返回原始值。

```typescript
import { clamp } from 'es-toolkit/math';

// 限制为最大值
const result1 = clamp(10, 5); // result1 是 5 (10 被限制为最大值 5)
const result2 = clamp(3, 5); // result2 是 3 (小于 5,保持不变)
```

#### 参数

- `value` (`number`): 要限制的数字。
- `maximum` (`number`): 最大值。

#### 返回值

(`number`): 返回被限制为不超过最大值的数字。

### `clamp(value, minimum, maximum)`

当您想将数字限制在给定的最小值和最大值范围内时,请使用 `clamp`。如果值超出范围,则被限制为最近的边界值。

```typescript
import { clamp } from 'es-toolkit/math';

// 在最小值和最大值范围内限制
const result1 = clamp(10, 5, 15); // result1 是 10 (在 5-15 范围内)
const result2 = clamp(2, 5, 15); // result2 是 5 (被限制为最小值 5)
const result3 = clamp(20, 5, 15); // result3 是 15 (被限制为最大值 15)
```

#### 参数

- `value` (`number`): 要限制的数字。
- `minimum` (`number`): 最小值。
- `maximum` (`number`): 最大值。

#### 返回值

(`number`): 返回在指定范围内限制的数字。
