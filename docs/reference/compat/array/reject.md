# reject (Lodash Compatibility)

::: warning Use `Array.filter()`

This `reject` function is implemented with complexity to support various predicate forms for compatibility with Lodash. For simple function predicates, `Array.filter()` works more simply and faster.

Instead, use the faster and more modern `Array.filter()`. For example, `reject(arr, func)` can be replaced with `arr.filter(item => !func(item))`.

:::

Iterates over a collection and returns a new array of elements that do not match the predicate function.

```typescript
const filtered = reject(collection, predicate);
```

## Reference

### `reject(collection, predicate)`

Returns a new array containing only elements from an array, object, or string that do not match the given condition. It performs the opposite operation of `filter`.

```typescript
import { reject } from 'es-toolkit/compat';

// Filter out even numbers
reject([1, 2, 3, 4, 5], n => n % 2 === 0);
// => [1, 3, 5]

// Filter out objects that have a specific property
reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
// => [{ b: 1 }]

// Filter out objects that have a specific property value
reject([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => [{ a: 1 }, { a: 3 }]

// Filter out specific characters from a string
reject('abc', char => char === 'b');
// => ['a', 'c']
```

This function supports various forms of predicates.

```typescript
import { reject } from 'es-toolkit/compat';

// Condition using a function
reject(users, user => user.age < 18);

// Partial matching of objects
reject(users, { active: false });

// Property-value array
reject(users, ['status', 'pending']);

// Check truthy value by property name
reject(users, 'premium');
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): The collection to iterate over.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, optional): The condition to execute for each element. Defaults to `identity`.

#### Returns

(`T[]`): Returns a new array composed of elements that do not match the predicate condition.
