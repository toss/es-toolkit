# range (for `BigInt`s)

Returns an array of `BigInt`s counting from a start value up to, but not including, an end value.

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `range(end)`

Use `range` with one argument to count from `0n` up to, but not including, the end value.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(4n)); // [0n, 1n, 2n, 3n]
console.log(range(0n)); // []
```

#### Parameters

- `end` (`bigint`): The end of the range, exclusive.

#### Returns

(`bigint[]`): Returns an array of `BigInt`s from `0n` up to, but not including, `end`.

### `range(start, end)`

Use `range` with two arguments to count from a start value instead of `0n`.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(2n, 5n)); // [2n, 3n, 4n]
console.log(range(-3n, 0n)); // [-3n, -2n, -1n]

// Nothing to count when start and end are the same
console.log(range(3n, 3n)); // []
```

Because `BigInt`s stay exact at any size, you can build ranges past `Number.MAX_SAFE_INTEGER` without values silently colliding.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(9007199254740993n, 9007199254740996n));
// [9007199254740993n, 9007199254740994n, 9007199254740995n]
```

#### Parameters

- `start` (`bigint`): The start of the range, inclusive.
- `end` (`bigint`): The end of the range, exclusive.

#### Returns

(`bigint[]`): Returns an array of `BigInt`s from `start` up to, but not including, `end`.

### `range(start, end, step)`

Use `range` with three arguments to count by something other than `1n`. A negative step counts down.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 10n, 2n)); // [0n, 2n, 4n, 6n, 8n]
console.log(range(5n, 0n, -1n)); // [5n, 4n, 3n, 2n, 1n]
console.log(range(5n, 0n, -2n)); // [5n, 3n, 1n]
```

If the step points away from the end value, there is nothing to produce and you get an empty array.

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 5n, -1n)); // []
console.log(range(5n, 0n, 1n)); // []
```

#### Parameters

- `start` (`bigint`): The start of the range, inclusive.
- `end` (`bigint`): The end of the range, exclusive.
- `step` (`bigint`, optional): The amount to count by. Defaults to `1n`.

#### Returns

(`bigint[]`): Returns an array of `BigInt`s from `start` up to, but not including, `end`, counting by `step`.

#### Throws

Throws an error if `step` is `0n`.
