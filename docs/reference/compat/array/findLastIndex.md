# findLastIndex (Lodash Compatibility)

::: warning Use `Array.prototype.findLastIndex`

This `findLastIndex` function operates slowly due to additional features such as handling `null` or `undefined`, partial object matching, and property name matching.

Use the faster and more modern `Array.prototype.findLastIndex` instead.

:::

Finds the index of the last element in an array that satisfies a condition.

```typescript
const lastIndex = findLastIndex(array, predicate, fromIndex);
```

## Usage

### `findLastIndex(array, predicate, fromIndex)`

Use `findLastIndex` when you want to find the index of the first element that matches a given condition starting from the end of the array. Returns `-1` if no element satisfies the condition.

This function can specify the condition in various ways. When you pass a function, it executes the function for each element. When you pass a partial object, it checks if the element has those properties. When you pass an array-formatted key-value pair, it checks if a specific property matches the given value. When you pass a string, it checks if that property evaluates to a truthy value.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

// Specify the condition using a function
findLastIndex(users, o => o.user === 'pebbles');
// Returns: 2

// Find a matching element using a partial object
findLastIndex(users, { user: 'barney', active: true });
// Returns: 0

// Find a matching element using a property-value pair
findLastIndex(users, ['active', false]);
// Returns: 2

// Find an element with a truthy value using a property name
findLastIndex(users, 'active');
// Returns: 0
```

You can also specify a starting position for the search. If `fromIndex` is negative, it's calculated from the end of the array.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// Search in reverse from index 3
findLastIndex(numbers, n => n < 4, 2);
// Returns: 2

// If you use a negative index, it's calculated from the end
findLastIndex(numbers, n => n > 2, -2);
// Returns: 3
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { findLastIndex } from 'es-toolkit/compat';

findLastIndex(null, n => n > 0); // -1
findLastIndex(undefined, n => n > 0); // -1
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to search.
- `predicate` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, optional): The condition to test each element. Can be a function, partial object, property-value pair, or property name. Default is the identity function.
- `fromIndex` (`number`, optional): The index to start the search from. If negative, it's calculated from the end of the array. Default is `array.length - 1`.

#### Returns

(`number`): Returns the index of the last element that satisfies the condition. Returns `-1` if no element satisfies the condition.
