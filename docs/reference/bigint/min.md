# min (for `BigInt`s)

Returns the smallest `BigInt` in an array.

```typescript
const smallest = min(numbers);
```

::: info

This function is available exclusively from `es-toolkit/bigint` to avoid potential conflicts with similar functions for other numeric types.

:::

## Usage

### `min(nums)`

Use `min` when you want the smallest of several `BigInt`s. `Math.min` cannot accept `BigInt`s at all, so this is the way to compare them.

```typescript
import { min } from 'es-toolkit/bigint';

const smallest = min([1n, 5n, 3n]);
console.log(smallest); // 1n

// Works with negative values
console.log(min([-5n, -1n, -3n])); // -5n
```

Because `BigInt`s are compared exactly, values that `number` would round to the same thing stay distinguishable.

```typescript
import { min } from 'es-toolkit/bigint';

// As `number`, both of these are 9007199254740992
console.log(min([9007199254740993n, 9007199254740992n])); // 9007199254740992n
```

There is no `BigInt` that means "no minimum" — `BigInt` has no `NaN` and no `Infinity` — so an empty array throws instead of returning a placeholder.

```typescript
import { min } from 'es-toolkit/bigint';

min([]); // RangeError: Cannot find the minimum of an empty array.
```

#### Parameters

- `nums` (`readonly bigint[]`): The array of `BigInt`s to search.

#### Returns

(`bigint`): Returns the smallest `BigInt` in the array.

#### Throws

Throws a `RangeError` if the array is empty.
