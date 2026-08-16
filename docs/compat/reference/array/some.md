# some (Lodash Compatibility)

::: warning Use `Array.prototype.some()` method

This `some` function operates in a complex manner due to handling various types of conditions and object support.

Instead, use the faster and more modern `Array.prototype.some()` method.

:::

Checks if any element in an array or object satisfies the given condition.

```typescript
const hasMatch = some(collection, predicate);
```

## Usage

### `some(collection, predicate)`

Use `some` when you want to check if at least one element in an array or object satisfies a condition. It supports various forms of conditions.

```typescript
import { some } from 'es-toolkit/compat';

// Using a condition function on an array
some([1, 2, 3, 4], n => n % 2 === 0);
// Returns true (2 and 4 are even)

// Matching with partial object on an array
some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// Returns true

// Matching with property-value pair on an array
some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
// Returns true

// Checking if property is truthy on an array
some([{ a: 0 }, { a: 1 }, { a: 0 }], 'a');
// Returns true (element with a=1 exists)

// Using a condition function on an object
some({ a: 1, b: 2, c: 3 }, n => n % 2 === 0);
// Returns true (2 is even)
```

If no condition is provided, it checks if there are any truthy values.

```typescript
import { some } from 'es-toolkit/compat';

some([0, 1, 2]); // true (1 and 2 are truthy)
some([false, null, undefined]); // false (all values are falsy)
some(null); // false (treated as empty array)
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): The array or object to check.
- `predicate` (optional): The function to check the condition, partial object, property-value pair, or property name.

#### Returns

(`boolean`): Returns `true` if at least one element satisfies the condition, `false` otherwise.
