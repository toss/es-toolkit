# inRange

检查值是否在指定范围内。

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

## 用法

### `inRange(value, maximum)`

当您想检查值是否在从 0 到小于最大值的范围内时,请使用 `inRange`。最小值自动设置为 0。

```typescript
import { inRange } from 'es-toolkit/math';

// 检查从 0 到小于 5 的范围
const result1 = inRange(3, 5); // result1 为 true (0 <= 3 < 5)
const result2 = inRange(5, 5); // result2 为 false (5 不小于 5)
const result3 = inRange(-1, 5); // result3 为 false (-1 < 0)
```

#### 参数

- `value` (`number`): 要检查的值。
- `maximum` (`number`): 范围的最大值(不包括)。

#### 返回值

(`boolean`): 如果值在从 0(包括)到最大值(不包括)的范围内,则返回 `true`,否则返回 `false`。

### `inRange(value, minimum, maximum)`

当您想检查值是否在指定的最小值和最大值范围内时,请使用 `inRange`。

```typescript
import { inRange } from 'es-toolkit/math';

// 检查最小值和最大值范围内
const result1 = inRange(3, 2, 5); // result1 为 true (2 <= 3 < 5)
const result2 = inRange(1, 2, 5); // result2 为 false (1 < 2)
const result3 = inRange(5, 2, 5); // result3 为 false (5 不小于 5)

// 可以用于负数范围
const result4 = inRange(-3, -5, -1); // result4 为 true (-5 <= -3 < -1)
```

#### 参数

- `value` (`number`): 要检查的值。
- `minimum` (`number`): 范围的最小值(包括)。
- `maximum` (`number`): 范围的最大值(不包括)。

#### 返回值

(`boolean`): 如果值在指定范围内,则返回 `true`,否则返回 `false`。

#### 错误

如果最小值大于或等于最大值,则抛出错误。
