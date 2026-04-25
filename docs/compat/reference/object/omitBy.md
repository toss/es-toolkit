# omitBy (Lodash compatibility)

::: warning Use `omitBy` from `es-toolkit`

This `omitBy` function is relatively slow due to array-like object checking, `iteratee` conversion, and key transformation processes.

Use the faster and more modern [`omitBy`](../../object/omitBy.md) from `es-toolkit` instead.

:::

Creates a new object excluding properties for which the predicate function returns true.

```typescript
const result = omitBy(obj, predicate);
```

## Usage

### `omitBy(object, predicate)`

Executes a predicate function for each property of the object and creates a new object excluding properties for which the predicate returns true. Useful for dynamically filtering properties based on conditions.

```typescript
import { omitBy } from 'es-toolkit/compat';

// Remove values of specific type
const data = { a: 1, b: 'remove', c: 3, d: 'keep' };
const numbers = omitBy(data, value => typeof value === 'string');
// Result: { a: 1, c: 3 }

// Remove properties based on condition
const user = { id: 1, name: 'John', age: 0, active: false, email: '' };
const validData = omitBy(user, value => !value);
// Result: { id: 1, name: 'John' } (removes falsy values)

// Filter by key name
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = omitBy(settings, (value, key) => key.startsWith('admin'));
// Result: { userSetting: true, debugMode: true }

// Remove only number properties
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const noNumbers = omitBy(mixed, value => typeof value === 'number');
// Result: { str: 'hello', bool: true, obj: {} }

// Can also be used with arrays
const arr = [1, 2, 3, 4, 5];
const filtered = omitBy(arr, value => value % 2 === 0);
// Result: { '0': 1, '2': 3, '4': 5 } (odd values at even indices)

// Utilize value, key, and original object
const scores = { math: 90, science: 75, english: 85, art: 60 };
const passingGrades = omitBy(scores, (value, key, obj) => {
  console.log(`${key}: ${value} (average: ${Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length})`);
  return value < 80;
});
// Result: { math: 90, english: 85 }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { omitBy } from 'es-toolkit/compat';

omitBy(null, () => true); // {}
omitBy(undefined, () => true); // {}
```

#### Parameters

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): The source object to filter.
- `predicate` (`ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, optional): The predicate function to execute for each property. Properties for which this returns true are removed. Defaults to the `identity` function.

#### Returns

(`Record<string, S> | Record<number, S> | Partial<T>`): Returns a new object consisting of properties that don't match the condition.
