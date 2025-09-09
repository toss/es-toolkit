# reject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns a new array of elements that do not satisfy the provided condition.

The condition can be specified in several ways:

- **Predicate function**: Runs a function for each element, selecting elements that do not satisfy the condition.
- **Partial object**: Selects elements that do not partially match the provided object.
- **Property-value pair**: Selects elements where a specified key does not match a given value.
- **Property name**: Selects elements where the specified property name does not exist.

## Signature

```typescript
function reject<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): T[];
function reject<T>(arr: T[], doesMatch: Partial<T>): T[];
function reject<T>(arr: T[], doesMatch: [keyof T, unknown]): T[];
function reject<T>(arr: T[], doesMatch: PropertyKey): T[];

function reject<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): T[];
function reject<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];
function reject<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T[keyof T], unknown]): T[];
function reject<T extends Record<string, unknown>>(object: T, doesMatch: PropertyKey): T[];
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to iterate over.

::: info `arr` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `reject` function handles `arr` in this way:

- If `arr` is an `ArrayLike<T>`, it gets converted into an array using `Array.from(...)`.
- If `arr` is `null` or `undefined`, it will be treated as an empty array.

:::

- `doesMatch`:

  - For the first `reject` overload with arrays:

    - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function to check if an element does not satisfy a condition.
    - **Partial object** (`Partial<T>`): A partial object that specifies the properties to not match.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to not match.
    - **Property name** (`PropertyKey`): The name of the property to check for non-existence in the elements.

  - For the `reject` overloads with objects:
    - **Predicate function** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): A function that takes a value, its key, and the object, and returns a truthy value if the item does not match the criteria.
    - **Partial value** (`Partial<T[keyof T]>`): A partial value to not match against the values of the object.
    - **Property-value pair** (`[keyof T[keyof T], unknown]`): An array where the first element is the property key and the second element is the value to not match.
    - **Property name** (`PropertyKey`): The name of the property to check for non-existence.

### Returns

(`T[]`): An array of elements that do not satisfy the condition. If none, an empty array. (`[]`)

## Examples

### Array

```typescript
import { reject } from 'es-toolkit/compat';

// Using a predicate function
reject([1, 2, 3], n => n % 2 === 0);
// => [1, 3]

// Using a partial object
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
reject(arr, { name: 'Bob' });
// => [{ id: 1, name: 'Alice' }]

// Using a property-value pair
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
reject(arr, ['name', 'Alice']);
// => [{ id: 2, name: 'Bob' }]

// Using a property name
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, age: 28 },
];
reject(arr, 'name');
// => [{ id: 3, age: 28 }]
```

### Object

```typescript
import { reject } from 'es-toolkit/compat';

// Using a predicate function
const obj = { a: 1, b: 2, c: 3 };
reject(obj, item => item > 2);
// => [1, 2]

// Using a partial object
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
};
reject(obj, { name: 'Bob' });
// => [{ id: 1, name: 'Alice' }]

// Using a property-value pair
const obj = {
  alice: { id: 1, name: 'Alice' },
  bob: { id: 2, name: 'Bob' },
};
reject(obj, ['name', 'Alice']);
// => [{ id: 2, name: 'Bob' }]

// Using a property name
const obj = {
  a: { id: 1, name: 'Alice' },
  b: { id: 2, name: 'Bob' },
  c: { id: 3, age: 28 },
};
reject(obj, 'name');
// => [{ id: 3, age: 28 }]
```
