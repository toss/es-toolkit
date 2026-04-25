# maxBy (Lodash Compatibility)

::: warning Use [maxBy](../../array/maxBy.md) from es-toolkit

This `maxBy` function works slowly due to iteratee function processing and type conversion.

Use the faster and more modern [maxBy](../../array/maxBy.md) from `es-toolkit` instead.

:::

Finds the element with the maximum value based on a condition.

```typescript
const maxItem = maxBy(array, iteratee);
```

## Usage

### `maxBy(array, iteratee)`

Finds the element in an array that has the largest value when computed by a function.

```typescript
import { maxBy } from 'es-toolkit/compat';

// Find element with maximum property in object array
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 35 },
];

maxBy(people, person => person.age);
// Returns: { name: 'Bob', age: 35 }

// Can also use property name
maxBy(people, 'age');
// Returns: { name: 'Bob', age: 35 }
```

Transform values with a function to find the maximum.

```typescript
import { maxBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
maxBy(items, x => x.a);
// Returns: { a: 3 }

const numbers = [-1, -2, -3];
maxBy(numbers, x => Math.abs(x));
// Returns: -3 (element with largest absolute value)
```

Access array elements by index.

```typescript
import { maxBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
maxBy(arrays, 0); // Array with maximum first element
// Returns: [3, 4]

maxBy(arrays, 1); // Array with maximum second element
// Returns: [0, 5]
```

Find elements matching specific property values.

```typescript
import { maxBy } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 35, active: true },
];

// First element among those with active: true
maxBy(users, ['active', true]);
// Returns: { name: 'John', age: 25, active: true }

// Specify condition as object
maxBy(users, { active: true });
// Returns: { name: 'John', age: 25, active: true }
```

Empty arrays return undefined.

```typescript
import { maxBy } from 'es-toolkit/compat';

maxBy([], x => x.a);
// Returns: undefined

maxBy(null);
// Returns: undefined

maxBy(undefined);
// Returns: undefined
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to search.
- `iteratee` (`ValueIteratee<T>`, optional): The function, property name, or condition to apply to each element.

#### Returns

(`T | undefined`): Returns the element with the largest value based on the condition. Returns `undefined` if the array is empty.
