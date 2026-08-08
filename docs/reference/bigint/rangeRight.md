# rangeRight (for `BigInt`s)

Returns the same `BigInt`s as [range](./range.md), but in descending order.

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end);
const numbers = rangeRight(start, end, step);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `rangeRight(end)`

Use `rangeRight` with one argument to count down from just below the end value to `0n`.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(4n)); // [3n, 2n, 1n, 0n]
console.log(rangeRight(0n)); // []
```

#### Parameters

- `end` (`bigint`): The end of the range, exclusive.

#### Returns

(`bigint[]`): Returns an array of `BigInt`s from just below `end` down to `0n`.

### `rangeRight(start, end)`

Use `rangeRight` with two arguments to count down to a start value other than `0n`.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(2n, 5n)); // [4n, 3n, 2n]
console.log(rangeRight(-3n, 0n)); // [-1n, -2n, -3n]
```

#### Parameters

- `start` (`bigint`): The start of the range, inclusive.
- `end` (`bigint`): The end of the range, exclusive.

#### Returns

(`bigint[]`): Returns an array of `BigInt`s from just below `end` down to `start`.

### `rangeRight(start, end, step)`

Use `rangeRight` with three arguments to step by something other than `1n`. The values are exactly those of `range` with the same arguments, reversed.

```typescript
import { range, rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 10n, 2n)); // [8n, 6n, 4n, 2n, 0n]
console.log(rangeRight(5n, 0n, -1n)); // [1n, 2n, 3n, 4n, 5n]

// Always the reverse of range with the same arguments
console.log(rangeRight(0n, 10n, 3n)); // [9n, 6n, 3n, 0n]
console.log(range(0n, 10n, 3n)); // [0n, 3n, 6n, 9n]
```

If the step points away from the end value, there is nothing to produce and you get an empty array.

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 5n, -1n)); // []
```

#### Parameters

- `start` (`bigint`): The start of the range, inclusive.
- `end` (`bigint`): The end of the range, exclusive.
- `step` (`bigint`, optional): The amount to count by. Defaults to `1n`.

#### Returns

(`bigint[]`): Returns the values of `range(start, end, step)` in descending order.

#### Throws

Throws an error if `step` is `0n`.
