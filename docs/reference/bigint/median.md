# median (for `BigInt`s)

Returns the middle value of an array of `BigInt`s.

```typescript
const middle = median(numbers);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `median(nums)`

Use `median` when you want the middle value of a set of `BigInt`s. It sorts a copy of the array — your array is left untouched — and returns the value in the middle.

```typescript
import { median } from 'es-toolkit/bigint';

const middle = median([1n, 2n, 3n, 4n, 5n]);
console.log(middle); // 3n

// The array does not need to be sorted beforehand
console.log(median([5n, 1n, 4n, 2n, 3n])); // 3n
```

When the array has an even number of elements, the two middle values are averaged. `BigInt` has no fractional part, so that average is **truncated toward zero**.

```typescript
import { median } from 'es-toolkit/bigint';

// (2n + 3n) / 2n is 2n, not 2.5
console.log(median([1n, 2n, 3n, 4n])); // 2n

// (1n + 2n) / 2n is 1n
console.log(median([1n, 2n])); // 1n

// Truncation goes toward zero, so this is -2n rather than -3n
console.log(median([-3n, -2n])); // -2n
```

There is no `BigInt` that means "no median" — `BigInt` has no `NaN` — so an empty array throws instead of returning a placeholder.

```typescript
import { median } from 'es-toolkit/bigint';

median([]); // RangeError: Cannot compute the median of an empty array.
```

#### Parameters

- `nums` (`readonly bigint[]`): The array of `BigInt`s to calculate the median of.

#### Returns

(`bigint`): Returns the median of the array. For an even number of elements, returns the average of the two middle values, truncated toward zero.

#### Throws

Throws a `RangeError` if the array is empty.
