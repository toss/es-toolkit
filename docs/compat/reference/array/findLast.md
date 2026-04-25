# findLast (Lodash Compatibility)

::: warning Use `Array.prototype.findLast`

This `findLast` function is complex and slow due to handling various types and special conditions.

Use the faster and more modern `Array.prototype.findLast` instead.

:::

Finds the last element in an array or object that satisfies a condition.

```typescript
const lastEven = findLast(array, predicate);
```

## Usage

### `findLast(collection, predicate?, fromIndex?)`

Finds the last element in an array or object that satisfies the given condition. Searches in reverse order from the end of the array and returns the first element that satisfies the condition.

```typescript
import { findLast } from 'es-toolkit/compat';

// Specify condition with a function
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 18 },
];
findLast(users, o => o.age < 40);
// => { user: 'pebbles', age: 18 }

// Specify condition with an object
findLast(users, { age: 36 });
// => { user: 'barney', age: 36 }

// Specify condition with a key-value pair
findLast(users, ['age', 18]);
// => { user: 'pebbles', age: 18 }

// Specify condition with a property name (last element with truthy value)
findLast(users, 'age');
// => { user: 'fred', age: 40 }
```

You can also specify a starting index for the search.

```typescript
import { findLast } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
findLast(numbers, n => n > 3, 6); // Search in reverse from index 6
// => 4
```

`null` or `undefined` returns empty results.

```typescript
import { findLast } from 'es-toolkit/compat';

findLast(null, x => x > 0); // undefined
findLast(undefined, x => x > 0); // undefined
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to search.
- `predicate` (`ListIterateeCustom<T, boolean>`, optional): The condition to apply to each element. Can be a function, object, key-value pair, or property name. Default is the `identity` function.
- `fromIndex` (`number`, optional): The index to start the search from. If negative, it's calculated from the end. Default is the last index of the array.

#### Returns

(`T | undefined`): Returns the last element that satisfies the condition. Returns `undefined` if no element satisfies the condition.
