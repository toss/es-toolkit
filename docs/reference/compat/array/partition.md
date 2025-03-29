# partition

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed @here.
:::

## Signature

```typescript
function partition<T>(
  collection: ArrayLike<T> | Record<string, T> | null | undefined,
  predicate?: ((value: T, index: number | string, collection: any) => unknown) | Object | Array<any> | string
): [T[], T[]];
```

### Parameters

- `collection`: The collection to iterate over.
- `predicate`: The function invoked per iteration. Can be:
  - A function that receives (value, index|key, collection)
  - An object to match against using property values
  - A property path to get a value from each element
  - An array of [path, value] to match against

### Returns

(`[T[], T[]]`): Returns a pair of arrays where the first contains the elements that passed the predicate check, and the second contains the elements that failed.

## Examples

```typescript
import { partition } from 'es-toolkit/compat';

// Using a predicate function
partition([1, 2, 3, 4], n => n % 2 === 0);
// => [[2, 4], [1, 3]]

// Using property shorthand
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: false },
];

// Using "property" iteratee shorthand
partition(users, 'active');
// => [[{ 'user': 'barney', 'age': 36, 'active': true }], [{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }]]

// Using "matches" iteratee shorthand
partition(users, { age: 1, active: false });
// => [[{ 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }, { 'user': 'fred', 'age': 40, 'active': false }]]

// Using "matchesProperty" iteratee shorthand
partition(users, ['active', false]);
// => [[{ 'user': 'fred', 'age': 40, 'active': false }, { 'user': 'pebbles', 'age': 1, 'active': false }], [{ 'user': 'barney', 'age': 36, 'active': true }]]
```
