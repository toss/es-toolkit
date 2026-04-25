# meanBy (Lodash Compatibility)

::: warning Use [meanBy](../../math/meanBy.md) from es-toolkit

This `meanBy` function works slowly due to iteratee function processing and type conversion.

Use the faster and more modern [meanBy](../../math/meanBy.md) from `es-toolkit` instead.

:::

Calculates the average of values that meet a condition.

```typescript
const average = meanBy(array, iteratee);
```

## Usage

### `meanBy(array, iteratee)`

Calculates the average of the results of applying a function to each element in an array.

```typescript
import { meanBy } from 'es-toolkit/compat';

// Average of specific property in object array
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 35 },
];

meanBy(people, person => person.age);
// Returns: 30

// Can also use property name
meanBy(people, 'age');
// Returns: 30
```

Transform values with a function to calculate the average.

```typescript
import { meanBy } from 'es-toolkit/compat';

const numbers = [1.5, 2.7, 3.2, 4.8];
meanBy(numbers, x => Math.floor(x));
// Returns: 2.5 (1 + 2 + 3 + 4) / 4

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
meanBy(items, x => x.a);
// Returns: 2
```

Access array elements by index.

```typescript
import { meanBy } from 'es-toolkit/compat';

const arrays = [[2], [3], [1]];
meanBy(arrays, 0); // Average of first elements
// Returns: 2
```

Calculate only for elements matching specific property values.

```typescript
import { meanBy } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 35, active: true },
];

// Only active users
meanBy(users, { active: true });
// Returns: 0.6666666 (2 out of 3 users are active)
```

Empty arrays return NaN.

```typescript
import { meanBy } from 'es-toolkit/compat';

meanBy([], x => x.a);
// Returns: NaN

meanBy(null);
// Returns: NaN

meanBy(undefined);
// Returns: NaN
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to process.
- `iteratee` (`ValueIteratee<T>`, optional): The function, property name, or condition to apply to each element.

#### Returns

(`number`): Returns the average of values that meet the condition. Returns `NaN` if the array is empty.
