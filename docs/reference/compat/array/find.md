# find

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the first item in an array or object that meets the specified condition.

You can specify the condition in several ways:

- **Predicate function**: If you provide a predicate function, the function will be applied to each item. The first item that makes the predicate function return `true` will be selected.
- **Partial object**: If you provide a partial object, the function will return the first item that matches the properties of the partial object.
- **Property-value pair**: If you provide a property-value pair, the function will return the first item that matches the property and value from the pair.
- **Property name**: If you provide a property name, the function will return the first item where the specified property has a truthy value.

## Signature

```typescript
function find<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown, fromIndex?: number): T | undefined;
function find<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): T | undefined;
function find<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): T | undefined;
function find<T>(arr: T[], doesMatch: PropertyKey, fromIndex?: number): T | undefined;

function find<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (item: T[keyof T], index: number, object: T) => unknown,
  fromIndex?: number
): T | undefined;
function find<T extends Record<string, unknown>>(
  object: T,
  doesMatch: Partial<T[keyof T]>,
  fromIndex?: number
): T | undefined;
function find<T extends Record<string, unknown>>(
  object: T,
  doesMatch: [keyof T[keyof T], unknown],
  fromIndex?: number
): T | undefined;
function find<T extends Record<string, unknown>>(object: T, doesMatch: PropertyKey, fromIndex?: number): T | undefined;
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to search through.

::: info `arr` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `find` function handles `arr` in this way:

- If `arr` is an `ArrayLike<T>`, it gets converted into an array using `Array.from(...)`.
- If `arr` is `null` or `undefined`, it will be treated as an empty array.

:::

::: info `object` can be `null` or `undefined`

To ensure full compatibility with lodash, the `find` function handles `object` in this way:

- If `object` is `null` or `undefined`, it will be converted into an empty object.

:::

- `doesMatch`:

  - For the first `find` overload with arrays:

    - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
    - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`PropertyKey`): The name of the property to check for a truthy value.

  - For the `find` overloads with objects:
    - **Predicate function** (`(item: T[keyof T], index: number, object: T) => unknown`): A function that takes an item, its key, and the object, and returns a truthy value if the item matches the criteria.
    - **Partial value** (`Partial<T[keyof T]>`): A partial value to match against the values of the object.
    - **Property-value pair** (`[keyof T[keyof T], unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`PropertyKey`): The name of the property to check for a truthy value.

- `fromIndex` (`number`): The index to start the search from, defaults to `0`.

### Returns

(`T | undefined`): The first item that has the specified property value, or `undefined` if no match is found.

## Examples

### Arrays

```typescript
import { find } from 'es-toolkit/compat';

// Using a predicate function
const items = [1, 2, 3, 4, 5];
const result = find(items, item => item > 3);
console.log(result); // 4

// Using a partial object
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// Using a property-value pair
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// Using a property name
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = find(items, 'name');
console.log(result); // { id: 1, name: 'Alice' }
```

### Objects

```typescript
import { find } from 'es-toolkit/compat';

// Using a predicate function
const obj = { a: 1, b: 2, c: 3 };
const result = find(obj, item => item > 2);
console.log(result); // 3

// Using a partial value
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = find(obj, { name: 'Bob' });
console.log(result); // { id: 2, name: 'Bob' }

// Using a property-value pair
const items = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = find(items, ['name', 'Alice']);
console.log(result); // { id: 1, name: 'Alice' }

// Using a property name
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = find(obj, 'name');
console.log(result); // { id: 1, name: 'Alice' }
```
