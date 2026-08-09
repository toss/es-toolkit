# clamp (`BigInt`)

将 `BigInt` 限制在给定的范围内。

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

::: info

此函数仅可从 `es-toolkit/bigint` 获得,以避免与其他数字类型的类似函数发生潜在冲突。

:::

## 用法

### `clamp(value, maximum)`

当您只需要一个上限时,请使用带两个参数的 `clamp`。任何超过最大值的值都会返回最大值,其他值则原样返回。

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 5n)); // 5n,因为 10n 超过了最大值
console.log(clamp(3n, 5n)); // 3n,已经在限制范围内
```

#### 参数

- `value` (`bigint`): 要限制的 `BigInt`。
- `maximum` (`bigint`): 上限(包括)。

#### 返回值

(`bigint`): 返回被限制在最大值以内的 `BigInt`。

### `clamp(value, minimum, maximum)`

当您同时需要下限和上限时,请使用带三个参数的 `clamp`。`Math.min` 和 `Math.max` 无法接受 `BigInt`,所以只能这样做。

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 0n, 5n)); // 5n,超过了最大值
console.log(clamp(-10n, 0n, 5n)); // 0n,低于最小值
console.log(clamp(3n, 0n, 5n)); // 3n,已经在范围内

// 两个边界都包括在内
console.log(clamp(0n, 0n, 5n)); // 0n
console.log(clamp(5n, 0n, 5n)); // 5n

// 负数范围同样适用
console.log(clamp(-10n, -5n, -1n)); // -5n
```

由于 `BigInt` 是精确比较的,即使边界远远超过 `Number.MAX_SAFE_INTEGER`,行为也与您预期的一致。

```typescript
import { clamp } from 'es-toolkit/bigint';

const maxUint64 = 18446744073709551615n;
console.log(clamp(20000000000000000000n, 0n, maxUint64)); // 18446744073709551615n
```

#### 参数

- `value` (`bigint`): 要限制的 `BigInt`。
- `minimum` (`bigint`): 下限(包括)。
- `maximum` (`bigint`): 上限(包括)。

#### 返回值

(`bigint`): 返回被限制在该范围内的 `BigInt`。
