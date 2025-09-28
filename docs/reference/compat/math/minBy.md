# minBy (Lodash compatibility)

::: warning Use [minBy](../../array/minBy.md) from es-toolkit

This `minBy` function works slowly due to iteratee function processing and type conversion.

Use the faster and more modern [minBy](../../array/minBy.md) from `es-toolkit` instead.

:::

Finds the element with the minimum value based on a condition.

```typescript
const minItem = minBy(array, iteratee);
```

## Reference

### `minBy(array, iteratee)`

Finds the element in an array that has the smallest value when computed by a function.

```typescript
import { minBy } from 'es-toolkit/compat';

// Find element with minimum property in object array
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 35 },
];

minBy(people, person => person.age);
// Returns: { name: 'John', age: 25 }

// Can also use property name
minBy(people, 'age');
// Returns: { name: 'John', age: 25 }
```

Transform values with a function to find the minimum.

```typescript
import { minBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
minBy(items, x => x.a);
// Returns: { a: 1 }

const numbers = [-1, -2, -3];
minBy(numbers, x => Math.abs(x));
// Returns: -1 (element with smallest absolute value)
```

Access array elements by index.

```typescript
import { minBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
minBy(arrays, 0); // Array with minimum first element
// Returns: [0, 5]

minBy(arrays, 1); // Array with minimum second element
// Returns: [1, 2]
```

Find elements matching specific property values.

```typescript
import { minBy } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 35, active: true },
];

// First element among those with active: true
minBy(users, ['active', true]);
// Returns: { name: 'Jane', age: 30, active: false }

// Specify condition as object
minBy(users, { active: true });
// Returns: { name: 'Jane', age: 30, active: false }
```

Empty arrays return undefined.

```typescript
import { minBy } from 'es-toolkit/compat';

minBy([], x => x.a);
// Returns: undefined

minBy(null);
// Returns: undefined

minBy(undefined);
// Returns: undefined
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to search.
- `iteratee` (`ValueIteratee<T>`, optional): The function, property name, or condition to apply to each element.

#### Returns

(`T | undefined`): Returns the element with the smallest value based on the condition. Returns `undefined` if the array is empty.
