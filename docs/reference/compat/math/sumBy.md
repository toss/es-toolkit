# sumBy (Lodash Compatibility)

::: warning Use [sumBy](../../math/sumBy.md) from es-toolkit

This `sumBy` function works slowly due to iteratee function processing and type conversion.

Use the faster and more modern [sumBy](../../math/sumBy.md) from `es-toolkit` instead.

:::

Adds values that meet a condition.

```typescript
const total = sumBy(array, iteratee);
```

## Usage

### `sumBy(array, iteratee)`

Adds the results of applying a function to each element in an array.

```typescript
import { sumBy } from 'es-toolkit/compat';

// Number array
sumBy([1, 2, 3], value => value);
// Returns: 6

sumBy([1.5, 2.5, 3.5], value => Math.floor(value));
// Returns: 6 (1 + 2 + 3)

// Empty array
sumBy([], value => value);
// Returns: 0
```

### `sumBy(array)`

If no function is provided, it adds the array values directly.

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, 2, 3]);
// Returns: 6

sumBy([1n, 2n, 3n]);
// Returns: 6n
```

Add specific properties from object arrays.

```typescript
import { sumBy } from 'es-toolkit/compat';

const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 35 },
];

sumBy(people, person => person.age);
// Returns: 90

// Can also use property name
sumBy(people, 'age');
// Returns: 90
```

Concatenates strings as well.

```typescript
import { sumBy } from 'es-toolkit/compat';

const items = [{ a: '1' }, { a: '2' }];
sumBy(items, obj => obj.a);
// Returns: '12'
```

Invalid values are ignored.

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, undefined, 2], value => value);
// Returns: 3 (undefined ignored)

sumBy(null);
// Returns: 0

sumBy(undefined);
// Returns: 0
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to process.
- `iteratee` (`((value: T) => number) | string`, optional): The function or property name to apply to each element.

#### Returns

(`number`): Returns the total sum of values that meet the condition.
