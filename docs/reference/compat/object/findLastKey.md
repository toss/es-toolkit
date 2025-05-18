# findLastKey

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the key of the last element that satisfies the provided predicate.

Unlike `findKey` which searches from the beginning, `findLastKey` searches from the end of the object.

## Signature

```typescript
function findLastKey<T>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined;

function findLastKey<T>(obj: T | null | undefined, objectToFind: Partial<T[keyof T]>): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: [PropertyKey, any]): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: PropertyKey): string | undefined;

function findLastKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;
```

### Parameters

- `obj` (`T | null | undefined`): The object to inspect.
- `predicate`: The function invoked per iteration. Can be one of:
  - `(value, key, obj) => unknown` - The function executed for each element.
  - `Partial<T[keyof T]>` - Matches elements that have matching properties.
  - `[PropertyKey, any]` - Matches elements with the specified property and value.
  - `PropertyKey` - Matches elements with truthy values for the specified property.

### Returns

(`string | undefined`): Returns the key of the matched element, else `undefined`.

## Examples

```typescript
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
