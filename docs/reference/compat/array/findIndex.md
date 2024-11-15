# findIndex

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the index of the first item in an array that meets the specified condition.

You can specify the condition in several ways:

- **Predicate function**: If you provide a predicate function, the function will be applied to each item. The first item that makes the predicate function return `true` will be selected.
- **Partial object**: If you provide a partial object, the function will return the first item that matches the properties of the partial object.
- **Property-value pair**: If you provide a property-value pair, the function will return the first item that matches the property and value from the pair.
- **Property name**: If you provide a property name, the function will return the first item where the specified property has a truthy value.

## Signature

```typescript
function findIndex<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown, fromIndex?: number): number;
function findIndex<T>(arr: T[], doesMatch: Partial<T>, fromIndex?: number): number;
function findIndex<T>(arr: T[], doesMatch: [keyof T, unknown], fromIndex?: number): number;
function findIndex<T>(arr: T[], doesMatch: PropertyKey, fromIndex?: number): number;
```

### Parameters

- `arr` (`T[]`): The array to search through.

::: info `arr` can be `ArrayLike<T>` or `null` or `undefined`

To ensure full compatibility with lodash, the `findIndex` function processes `arr` as follows:

- If `arr` is `ArrayLike<T>`, it converts it to an array using `Array.from(...)`.
- If `arr` is `null` or `undefined`, it is treated as an empty array.

:::

- `doesMatch`:

  - **Predicate function** (`(item: T, index: number, arr: readonly T[]) => unknown`): A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
  - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
  - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
  - **Property name** (`PropertyKey`): The name of the property to check for a truthy value.

- `fromIndex` (`number`): The index to start the search from, defaults to `0`.

### Returns

(`number`): The index of the first item that has the specified property value, or `-1` if no match is found.

## Examples

```typescript
import { findIndex } from 'es-toolkit/compat';

// Using a predicate function
const items = [1, 2, 3, 4, 5];
const result = findIndex(items, item => item > 3);
console.log(result); // 3

// Using a partial object
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findIndex(items, { name: 'Bob' });
console.log(result); // 1

// Using a property-value pair
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findIndex(items, ['name', 'Alice']);
console.log(result); // 0

// Using a property name
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = findIndex(items, 'name');
console.log(result); // 0
```
