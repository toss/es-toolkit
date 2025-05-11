# findLastKey

::: info
This function is only available from `es-toolkit/compat`.  
It’s provided for compatibility with lodash and isn’t part of the core `es-toolkit` bundle.
:::

Returns the **key of the last element** in an object that satisfies the provided condition.

It's just like `findKey`, but works from the **end** of the object instead of the beginning.

## Signature

```ts
function findLastKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(
  obj: T,
  objectToFind: Partial<T[keyof T]>
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(
  obj: T,
  propertyToFind: [keyof T[keyof T], any]
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(
  obj: T,
  propertyToFind: keyof T[keyof T]
): keyof T | undefined;
```

### Parameters

- `obj` (`T`): The object to search.
- `predicate`: The condition to match. This can be:
  - A **function**: `(value, key, obj) => boolean`
  - A **partial object**: e.g. `{ active: true }`
  - A **property-value pair**: e.g. `['active', true]`
  - A **property name**: e.g. `'active'` (truthy check)

### Returns

Returns the key of the last element that satisfies the condition.  
If no element matches, `undefined` is returned.

## Examples

```ts
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// Using a function predicate
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// Using a partial object
findLastKey(users, { active: true });
// => 'pebbles'

// Using a property-value pair
findLastKey(users, ['active', false]);
// => 'fred'

// Using a property name (truthy)
findLastKey(users, 'active');
// => 'pebbles'
```
