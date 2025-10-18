# takeWhile (Lodash compatibility)

::: warning Please use [takeWhile](../../array/takeWhile.md) from `es-toolkit`

This `takeWhile` function operates slowly due to handling `null` or `undefined`.

Please use the faster and modern [takeWhile](../../array/takeWhile.md) from `es-toolkit` instead.

:::

Takes elements from the beginning of an array while the condition is satisfied.

```typescript
const result = takeWhile(array, predicate);
```

## Reference

### `takeWhile(array, predicate)`

Use `takeWhile` when you want to create a new array by taking elements from the beginning of an array while the condition is satisfied. It stops when the condition evaluates to false.

```typescript
import { takeWhile } from 'es-toolkit/compat';

// Using function condition
const numbers = [1, 2, 3, 4, 5];
takeWhile(numbers, x => x < 3);
// Returns: [1, 2]

// Using object property condition
const users = [
  { user: 'barney', active: false },
  { user: 'fred', active: false },
  { user: 'pebbles', active: true },
];

takeWhile(users, o => !o.active);
// Returns: [{ user: 'barney', active: false }, { user: 'fred', active: false }]

// Matching with partial object
takeWhile(users, { active: false });
// Returns: [{ user: 'barney', active: false }]

// Matching with property-value array
takeWhile(users, ['active', false]);
// Returns: [{ user: 'barney', active: false }, { user: 'fred', active: false }]

// Checking for truthy value by property name
const items = [{ active: true }, { active: true }, { active: false }];
takeWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null` or `undefined` is treated as an empty array.

```typescript
import { takeWhile } from 'es-toolkit/compat';

takeWhile(null, x => x > 0); // []
takeWhile(undefined, x => x > 0); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to process.
- `predicate` (`ListIteratee<T>`, optional): The condition to run for each element. Can be a function, partial object, property-value array, or property name. Default is the identity function.

#### Returns

(`T[]`): Returns a new array of elements taken from the beginning while the condition is satisfied.
