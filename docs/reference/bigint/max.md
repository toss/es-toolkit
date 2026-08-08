# max (for `BigInt`s)

Returns the largest `BigInt` in an array.

```typescript
const largest = max(numbers);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `max(nums)`

Use `max` when you want the largest of several `BigInt`s. `Math.max` cannot accept `BigInt`s at all, so this is the way to compare them.

```typescript
import { max } from 'es-toolkit/bigint';

const largest = max([1n, 5n, 3n]);
console.log(largest); // 5n

// Works with negative values
console.log(max([-5n, -1n, -3n])); // -1n
```

Because `BigInt`s are compared exactly, values that `number` would round to the same thing stay distinguishable.

```typescript
import { max } from 'es-toolkit/bigint';

// As `number`, both of these are 9007199254740992
console.log(max([9007199254740992n, 9007199254740993n])); // 9007199254740993n
```

There is no `BigInt` that means "no maximum" — `BigInt` has no `NaN` and no `-Infinity` — so an empty array throws instead of returning a placeholder.

```typescript
import { max } from 'es-toolkit/bigint';

max([]); // RangeError: Cannot find the maximum of an empty array.
```

#### Parameters

- `nums` (`readonly bigint[]`): The array of `BigInt`s to search.

#### Returns

(`bigint`): Returns the largest `BigInt` in the array.

#### Throws

Throws a `RangeError` if the array is empty.
