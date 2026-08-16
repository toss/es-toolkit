# inRange (for `BigInt`s)

Checks whether a `BigInt` falls within a range.

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `inRange(value, maximum)`

Use `inRange` with two arguments to check the range from `0n` up to, but not including, the maximum. The minimum is automatically `0n`.

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(3n, 5n)); // true, because 0n <= 3n < 5n
console.log(inRange(5n, 5n)); // false, because the maximum is exclusive
console.log(inRange(-1n, 5n)); // false, because -1n is below 0n
```

#### Parameters

- `value` (`bigint`): The `BigInt` to check.
- `maximum` (`bigint`): The upper bound of the range, exclusive.

#### Returns

(`boolean`): Returns `true` if the `BigInt` is at least `0n` and below the maximum, otherwise `false`.

#### Throws

Throws an error if the maximum is not greater than `0n`.

### `inRange(value, minimum, maximum)`

Use `inRange` with three arguments to check an explicit range. The lower bound is inclusive and the upper bound is exclusive.

```typescript
import { inRange } from 'es-toolkit/bigint';

console.log(inRange(5n, 0n, 10n)); // true
console.log(inRange(0n, 0n, 10n)); // true, the lower bound is inclusive
console.log(inRange(10n, 0n, 10n)); // false, the upper bound is exclusive

// Negative ranges work too
console.log(inRange(-3n, -5n, -1n)); // true
```

This is useful for checking that a value fits an integer type or a database column before you store it, since `BigInt` comparisons stay exact at any size.

```typescript
import { inRange } from 'es-toolkit/bigint';

// Does this fit in an unsigned 64-bit column?
const maxUint64Exclusive = 18446744073709551616n;
console.log(inRange(18446744073709551615n, 0n, maxUint64Exclusive)); // true
console.log(inRange(18446744073709551616n, 0n, maxUint64Exclusive)); // false
```

#### Parameters

- `value` (`bigint`): The `BigInt` to check.
- `minimum` (`bigint`): The lower bound of the range, inclusive.
- `maximum` (`bigint`): The upper bound of the range, exclusive.

#### Returns

(`boolean`): Returns `true` if the `BigInt` is within the range, otherwise `false`.

#### Throws

Throws an error if the minimum is greater than or equal to the maximum.
