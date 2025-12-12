# sum (Lodash Compatibility)

::: warning Use [sum](../../math/sum.md) from es-toolkit

This `sum` function works slowly due to type conversion and null/undefined handling.

Use the faster and more modern [sum](../../math/sum.md) from `es-toolkit` instead.

:::

Adds all values in an array.

```typescript
const total = sum(array);
```

## Usage

### `sum(array)`

Adds all numbers in an array to get the total sum.

```typescript
import { sum } from 'es-toolkit/compat';

// Number array
sum([1, 2, 3]);
// Returns: 6

sum([1.5, 2.5, 3]);
// Returns: 7

// Empty array
sum([]);
// Returns: 0
```

Handles BigInt and strings as well.

```typescript
import { sum } from 'es-toolkit/compat';

// BigInt array
sum([1n, 2n, 3n]);
// Returns: 6n

// String array (concatenated)
sum(['1', '2']);
// Returns: '12'
```

Invalid values are ignored.

```typescript
import { sum } from 'es-toolkit/compat';

sum([1, undefined, 2]);
// Returns: 3 (undefined ignored)

sum(null);
// Returns: 0

sum(undefined);
// Returns: 0
```

#### Parameters

- `array` (`ArrayLike<any> | null | undefined`): The array containing values to add.

#### Returns

(`number`): Returns the total sum of all values.
