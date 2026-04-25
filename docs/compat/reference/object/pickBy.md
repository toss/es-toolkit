# pickBy (Lodash compatibility)

::: warning Use `pickBy` from `es-toolkit`

This `pickBy` function is relatively slow due to array-like object checking, `iteratee` conversion, and key transformation processes.

Use the faster and more modern [`pickBy`](../../object/pickBy.md) from `es-toolkit` instead.

:::

Creates a new object selecting only properties for which the predicate function returns true.

```typescript
const result = pickBy(obj, predicate);
```

## Usage

### `pickBy(object, predicate)`

Executes a predicate function for each property of the object and creates a new object containing only properties for which the predicate returns true. Useful for dynamically selecting properties based on conditions.

```typescript
import { pickBy } from 'es-toolkit/compat';

// Select only values of specific type
const data = { a: 1, b: 'keep', c: 3, d: 'select' };
const strings = pickBy(data, value => typeof value === 'string');
// Result: { b: 'keep', d: 'select' }

// Select properties based on condition
const user = { id: 1, name: 'John', age: 0, active: true, email: '' };
const validData = pickBy(user, value => Boolean(value));
// Result: { id: 1, name: 'John', active: true } (only truthy values)

// Filter by key name
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = pickBy(settings, (value, key) => key.startsWith('user'));
// Result: { userSetting: true }

// Select only number properties
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const numbersOnly = pickBy(mixed, value => typeof value === 'number');
// Result: { num1: 42, num2: 0 }

// Can also be used with arrays
const arr = [1, 2, 3, 4, 5];
const evens = pickBy(arr, value => value % 2 === 0);
// Result: { '1': 2, '3': 4 } (indices and values of even numbers)

// Utilize value, key, and original object
const scores = { math: 90, science: 75, english: 85, art: 60 };
const highScores = pickBy(scores, (value, key, obj) => {
  const average = Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
  return value > average;
});
// Result: { math: 90, english: 85 }
```

When called without a predicate function, it selects only truthy values.

```typescript
import { pickBy } from 'es-toolkit/compat';

const data = { a: 1, b: '', c: 0, d: 'hello', e: null, f: true };
const truthyValues = pickBy(data);
// Result: { a: 1, d: 'hello', f: true }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { pickBy } from 'es-toolkit/compat';

pickBy(null, () => true); // {}
pickBy(undefined, () => true); // {}
```

#### Parameters

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): The source object to filter.
- `predicate` (`ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, optional): The predicate function to execute for each property. Properties for which this returns true are selected. Defaults to the `identity` function.

#### Returns

(`Record<string, S> | Record<number, S> | Partial<T>`): Returns a new object consisting of properties that match the condition.
