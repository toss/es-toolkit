# percentile (for `BigInt`s)

Returns the `BigInt` at a given percentile of an array.

```typescript
const value = percentile(numbers, 90);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `percentile(arr, percentile)`

Use `percentile` when you want to know the value below which a given share of your data falls — a p90 latency, for example. It sorts a copy of the array — your array is left untouched — and picks the value at the matching rank.

```typescript
import { percentile } from 'es-toolkit/bigint';

const latencies = [1n, 2n, 3n, 4n, 5n];

console.log(percentile(latencies, 50)); // 3n
console.log(percentile(latencies, 90)); // 5n

// The array does not need to be sorted beforehand
console.log(percentile([30n, 10n, 20n], 50)); // 20n
```

This uses the [nearest-rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method), so the answer is always a value that is already in the array. It never interpolates between two values, which means it never has to round.

```typescript
import { percentile } from 'es-toolkit/bigint';

// The midpoint of 1n and 2n would be 1.5, which no BigInt can hold,
// so the nearest rank is returned instead.
console.log(percentile([1n, 2n], 50)); // 1n

// 0 always gives the smallest value and 100 always gives the largest
console.log(percentile([5n, 1n, 3n], 0)); // 1n
console.log(percentile([5n, 1n, 3n], 100)); // 5n
```

The percentile itself is an ordinary `number` between `0` and `100`, not a `BigInt`, because it is a percentage rather than a quantity being measured.

```typescript
import { percentile } from 'es-toolkit/bigint';

percentile([1n, 2n, 3n], 101); // Error: Expected percentile to be <= 100 but got "101".
percentile([], 50); // RangeError: Cannot compute the percentile of an empty array.
```

#### Parameters

- `arr` (`readonly bigint[]`): The array of `BigInt`s to calculate the percentile of.
- `percentile` (`number`): The percentile to look up, between `0` and `100`.

#### Returns

(`bigint`): Returns the `BigInt` at the given percentile. Always one of the values already in the array.

#### Throws

Throws an error if `percentile` is `NaN`, less than `0`, or greater than `100`. Throws a `RangeError` if the array is empty.
