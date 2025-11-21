# remove (Lodash Compatibility)

::: warning Use `remove` from `es-toolkit`

This `remove` function is implemented in a complex way to support various forms of predicates for Lodash compatibility. The `remove` function in the main library only supports simple function predicates, so it operates faster.

Instead, use the faster and more modern [remove](../../array/remove.md) from `es-toolkit`.

:::

Removes elements that match a condition from an array and returns the removed elements.

```typescript
const removedElements = remove(array, predicate);
```

## Usage

### `remove(array, predicate)`

Iterates through the array and removes elements that match the given condition from the original array, returning the removed elements as a new array. Note that the original array is directly modified.

```typescript
import { remove } from 'es-toolkit/compat';

// Remove with function condition
const numbers = [1, 2, 3, 4, 5];
const evens = remove(numbers, n => n % 2 === 0);
console.log(numbers); // => [1, 3, 5]
console.log(evens); // => [2, 4]

// Remove with partial object matching
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
const removed = remove(objects, { a: 1 });
console.log(objects); // => [{ a: 2 }, { a: 3 }]
console.log(removed); // => [{ a: 1 }]

// Remove with property-value pair
const items = [{ name: 'apple' }, { name: 'banana' }, { name: 'cherry' }];
const cherries = remove(items, ['name', 'cherry']);
console.log(items); // => [{ name: 'apple' }, { name: 'banana' }]
console.log(cherries); // => [{ name: 'cherry' }]
```

This function supports various forms of predicates.

```typescript
import { remove } from 'es-toolkit/compat';

// Function condition
remove(users, user => user.active === false);

// Partial object matching
remove(users, { status: 'inactive' });

// Property-value array
remove(users, ['type', 'guest']);

// Check truthy value by property name
remove(users, 'isDeleted');
```

#### Parameters

- `array` (`ArrayLike<T>`): The array to modify.
- `predicate` (`((value: T, index: number, array: ArrayLike<T>) => boolean) | Partial<T> | [keyof T, unknown] | keyof T`, optional): The condition to execute for each element. Default is `identity`.

#### Returns

(`T[]`): Returns a new array consisting of elements that were removed because they matched the condition.
