# findIndex (Lodash Compatibility)

::: warning Use `Array.prototype.findIndex`

This `findIndex` function operates slowly due to additional features such as handling various condition formats and `fromIndex` processing.

Use the faster and more modern `Array.prototype.findIndex` instead.

:::

Finds the index of the first element in an array that matches a condition.

```typescript
const index = findIndex(arr, doesMatch, fromIndex);
```

## Reference

### `findIndex(arr, doesMatch, fromIndex)`

Use `findIndex` when you want to find the position of the first element in an array that matches a specific condition. You can specify the condition in various ways. If no element matches the condition, it returns `-1`.

When you specify a condition as a function, it executes the function for each element and returns the index of the first element that returns true.

```typescript
import { findIndex } from 'es-toolkit/compat';

const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true },
  { id: 3, name: 'Charlie', active: true },
];

// Specify condition with a function
findIndex(users, user => user.active);
// Returns: 1
```

When you specify a condition as a partial object, it returns the index of the first element that matches those properties.

```typescript
import { findIndex } from 'es-toolkit/compat';

// Specify condition with a partial object
findIndex(users, { name: 'Bob', active: true });
// Returns: 1
```

When you specify a condition as an array of property name and value, it returns the index of the first element whose property matches that value.

```typescript
import { findIndex } from 'es-toolkit/compat';

// Specify condition with a [property, value] array
findIndex(users, ['active', true]);
// Returns: 1
```

When you specify only a property name, it returns the index of the first element where that property evaluates to true.

```typescript
import { findIndex } from 'es-toolkit/compat';

// Specify condition with a property name
findIndex(users, 'active');
// Returns: 1
```

When you specify `fromIndex`, the search starts from that index. Negative values are calculated from the end of the array.

```typescript
import { findIndex } from 'es-toolkit/compat';

// Start search from index 2
findIndex(users, user => user.active, 2);
// Returns: 2

// Search from the second element from the end
findIndex(users, user => user.active, -2);
// Returns: 1
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { findIndex } from 'es-toolkit/compat';

findIndex(null, user => user.active); // -1
findIndex(undefined, 'active'); // -1
```

#### Parameters

- `arr` (`ArrayLike<T> | null | undefined`): The array to search.
- `doesMatch` (`((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, optional): The matching condition. Can be a function, partial object, key-value pair, or property name.
- `fromIndex` (`number`, optional): The index to start the search from. Default is `0`.

#### Returns

(`number`): Returns the index of the first element that matches the condition. Returns `-1` if no element matches.
