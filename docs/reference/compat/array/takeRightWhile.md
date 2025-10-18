# takeRightWhile (Lodash compatibility)

::: warning Please use [takeRightWhile](../../array/takeRightWhile.md) from `es-toolkit`

This `takeRightWhile` function operates slowly due to handling `null` or `undefined`.

Please use the faster and modern [takeRightWhile](../../array/takeRightWhile.md) from `es-toolkit` instead.

:::

Takes elements from the end of an array while the condition is satisfied.

```typescript
const result = takeRightWhile(array, predicate);
```

## Reference

### `takeRightWhile(array, predicate)`

Use `takeRightWhile` when you want to create a new array by taking elements from the end of an array while the condition is satisfied. It stops when the condition evaluates to false.

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

// Using function condition
const numbers = [1, 2, 3, 4, 5];
takeRightWhile(numbers, x => x > 3);
// Returns: [4, 5]

// Using object property condition
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

takeRightWhile(users, o => !o.active);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// Matching with partial object
takeRightWhile(users, { active: false });
// Returns: [{ user: 'pebbles', active: false }]

// Matching with property-value array
takeRightWhile(users, ['active', false]);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// Checking for truthy value by property name
const items = [{ active: false }, { active: true }, { active: true }];
takeRightWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null` or `undefined` is treated as an empty array.

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

takeRightWhile(null, x => x > 0); // []
takeRightWhile(undefined, x => x > 0); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to process.
- `predicate` (`ListIteratee<T>`, optional): The condition to run for each element. Can be a function, partial object, property-value array, or property name. Default is the identity function.

#### Returns

(`T[]`): Returns a new array of elements taken from the end while the condition is satisfied.
