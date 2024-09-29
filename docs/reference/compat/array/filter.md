# filter

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns a new array of elements that satisfy the provided condition.

The condition can be specified in several ways:

- **Predicate function**: Runs a function for each element, selecting elements that satisfy the condition.
- **Partial object**: Selects elements that partially match the provided object.
- **Property-value pair**: Selects elements where a specified key matches a given value.
- **Property name**: Selects elements where the specified property name exists.

## Signature

```typescript
function filter<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T[];
function filter<T>(arr: T[], doesMatch: Partial<T>): T[];
function filter<T>(arr: T[], doesMatch: [keyof T, unknown]): T[];
function filter<T>(arr: T[], doesMatch: string): T[];

function filter<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): T[];
function filter<T extends Record<string, unknown>>(object: T, doesMatch: string): T[];
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to iterate over.

- `doesMatch`:

  - For the first `filter` overload with arrays:

    - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function to check if an element satisfies a condition.
    - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`string`): The name of the property to check for in the elements.

  - For the `filter` overloads with objects:
    - **Predicate function** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): A function that takes an value, its key, and the object, and returns a truthy value if the item matches the criteria.
    - **Partial value** (`Partial<T[keyof T]>`): A partial value to match against the values of the object.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`string`): The name of the property to check for a truthy value.

### Returns

(`T[]`): An array of elements that satisfy the condition. If none, an empty array. (`[]`)

## Examples

### Array

```typescript
import { filter } from 'es-toolkit/compat';

// Using a predicate function
filter([1, 2, 3], n => n % 2 === 0);
// => [2]

// Using a partial object
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// Using a property-value pair
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
filter(arr, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// Using a property name
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, age: 28 },
];
filter(arr, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### Object

```typescript
import { filter } from 'es-toolkit/compat';

// Using a predicate function
const obj = { a: 1, b: 2, c: 3 };
filter(obj, item => item > 2);
// => [3]

// Using a partial object
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
};
filter(obj, { name: 'Bob' });
// => [{ id: 2, name: 'Bob' }]

// Using a property-value pair
const obj = {
  alice: { id: 1, name: 'Alice' },
  bob: { id: 2, name: 'Bob' },
};
filter(obj, ['name', 'Alice']);
// => [{ id: 1, name: 'Alice' }]

// Using a property name
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
  c: { id: 3, age: 28 },
};
filter(obj, 'name');
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```
