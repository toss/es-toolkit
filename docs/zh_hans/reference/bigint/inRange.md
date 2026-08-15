# inRange (`BigInt`)

检查 `BigInt` 是否在指定范围内。

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `inRange(value, maximum)`

使用带两个参数的 `inRange` 来检查从 `0n` 到小于最大值的范围。最小值自动为 `0n`。

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(3n, 5n)); // true,因为 0n <= 3n < 5n
console.log(inRange(5n, 5n)); // false,因为不包括最大值
console.log(inRange(-1n, 5n)); // false,因为 -1n 低于 0n
```

#### 参数

- `value` (`bigint`): 要检查的 `BigInt`。
- `maximum` (`bigint`): 范围的上限(不包括)。

#### 返回值

(`boolean`): 如果 `BigInt` 大于等于 `0n` 且小于最大值,则返回 `true`,否则返回 `false`。

#### 错误

如果最大值不大于 `0n`,则抛出错误。

### `inRange(value, minimum, maximum)`

使用带三个参数的 `inRange` 来检查明确指定的范围。下限包括在内,上限不包括在内。

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(5n, 0n, 10n)); // true
console.log(inRange(0n, 0n, 10n)); // true,包括下限
console.log(inRange(10n, 0n, 10n)); // false,不包括上限

// 负数范围同样适用
console.log(inRange(-3n, -5n, -1n)); // true
```

由于 `BigInt` 的比较在任何大小下都保持精确,这非常适合在存储之前检查值是否适合某个整数类型或数据库列。

```typescript
import { inRange } from 'es-toolkit/bigint';

// 这个值能放进无符号 64 位的列吗?
const maxUint64Exclusive = 18446744073709551616n;
console.log(inRange(18446744073709551615n, 0n, maxUint64Exclusive)); // true
console.log(inRange(18446744073709551616n, 0n, maxUint64Exclusive)); // false
```

#### 参数

- `value` (`bigint`): 要检查的 `BigInt`。
- `minimum` (`bigint`): 范围的下限(包括)。
- `maximum` (`bigint`): 范围的上限(不包括)。

#### 返回值

(`boolean`): 如果 `BigInt` 在该范围内,则返回 `true`,否则返回 `false`。

#### 错误

如果最小值大于或等于最大值,则抛出错误。
