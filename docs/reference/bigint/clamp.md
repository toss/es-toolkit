# clamp (for `BigInt`s)

Restricts a `BigInt` to a given range.

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `clamp(value, maximum)`

Use `clamp` with two arguments when you only want an upper limit. Anything above the maximum comes back as the maximum, and anything else is returned unchanged.

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 5n)); // 5n, because 10n is above the maximum
console.log(clamp(3n, 5n)); // 3n, already within the limit
```

#### Parameters

- `value` (`bigint`): The `BigInt` to clamp.
- `maximum` (`bigint`): The upper bound, inclusive.

#### Returns

(`bigint`): Returns the `BigInt`, capped at the maximum.

### `clamp(value, minimum, maximum)`

Use `clamp` with three arguments when you want both a lower and an upper limit. `Math.min` and `Math.max` cannot accept `BigInt`s, so this is the way to do it.

```typescript
import { clamp } from 'es-toolkit/bigint';

console.log(clamp(10n, 0n, 5n)); // 5n, above the maximum
console.log(clamp(-10n, 0n, 5n)); // 0n, below the minimum
console.log(clamp(3n, 0n, 5n)); // 3n, already within the range

// Both bounds are inclusive
console.log(clamp(0n, 0n, 5n)); // 0n
console.log(clamp(5n, 0n, 5n)); // 5n

// Negative ranges work too
console.log(clamp(-10n, -5n, -1n)); // -5n
```

Because `BigInt`s are compared exactly, bounds far past `Number.MAX_SAFE_INTEGER` still behave the way you would expect.

```typescript
import { clamp } from 'es-toolkit/bigint';

const maxUint64 = 18446744073709551615n;
console.log(clamp(20000000000000000000n, 0n, maxUint64)); // 18446744073709551615n
```

#### Parameters

- `value` (`bigint`): The `BigInt` to clamp.
- `minimum` (`bigint`): The lower bound, inclusive.
- `maximum` (`bigint`): The upper bound, inclusive.

#### Returns

(`bigint`): Returns the `BigInt`, constrained to the range.
