# some

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if there is an element in an array or object that matches the given predicate.

You can specify the condition in several ways:

- **Predicate function**: If you provide a predicate function, the function will be applied to each item. The first item that makes the predicate function return `true` will be selected.
- **Partial object**: If you provide a partial object, the function will return the first item that matches the properties of the partial object.
- **Property-value pair**: If you provide a property-value pair, the function will return the first item that matches the property and value from the pair.
- **Property name**: If you provide a property name, the function will return the first item where the specified property has a truthy value.

If no predicate is provided, the function checks if there is any truthy element in the array or object.

## Signature

```typescript
function some<T>(arr: T[]): boolean;
function some<T>(arr: T[], predicate: (item: T, index: number, arr: any) => unknown): boolean;
function some<T>(arr: T[], predicate: [keyof T, unknown]): boolean;
function some<T>(arr: T[], predicate: PropertyKey): boolean;
function some<T>(arr: T[], predicate: Partial<T>): boolean;

function some<T extends Record<string, unknown>>(object: T): boolean;
function some<T extends Record<string, unknown>>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;
function some<T extends Record<string, unknown>>(object: T, predicate: Partial<T[keyof T]>): boolean;
function some<T extends Record<string, unknown>>(object: T, predicate: [keyof T[keyof T], unknown]): boolean;
function some<T extends Record<string, unknown>>(object: T, predicate: PropertyKey): boolean;
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to iterate over.

::: info `arr` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `some` function handles `arr` in this way:

- If `arr` is an `ArrayLike<T>`, it gets converted into an array using `Array.from(...)`.
- If `arr` is `null` or `undefined`, it will be treated as an empty array.

:::

::: info `object` can be `null` or `undefined`

To ensure full compatibility with lodash, the `some` function handles `object` in this way:

- If `object` is `null` or `undefined`, it will be converted into an empty object.

:::

- `predicate`:

  - For the `some` overload with arrays:

    - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
    - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`PropertyKey`): The name of the property to check for a truthy value.

  - For the `some` overloads with objects:
    - **Predicate function** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): A function that takes an value, its key, and the object, and returns a truthy value if the item matches the criteria.
    - **Partial value** (`Partial<T[keyof T]>`): A partial value to match against the values of the object.
    - **Property-value pair** (`[keyof T[keyof T], unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`PropertyKey`): The name of the property to check for a truthy value.

### Returns

(`boolean`): Returns `true` if any element passes the predicate check, else `false`.

## Examples

### Arrays

```typescript
import { some } from 'es-toolkit/compat';

// Using a predicate function
let items = [1, 2, 3, 4, 5];
let result = some(items, item => item > 3);
console.log(result); // true

// Using a partial object
items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
result = some(items, { name: 'Bob' });
console.log(result); // true

// Using a property-value pair
items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
result = some(items, ['name', 'Bob']);
console.log(result); // true

// Using a property name
items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
result = some(items, 'name');
console.log(result); // true
```

### Objects

```typescript
import { some } from 'es-toolkit/compat';

// Using a predicate function
let obj = { a: 1, b: 2, c: 3 };
let result = some(object, value => value > 2);
console.log(result); // true

// Using a partial value
obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
result = some(obj, { name: 'Bob' });
console.log(result); // true

// Using a property-value pair
obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
result = some(obj, ['name', 'Bob']);
console.log(result); // true

// Using a property name
obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
result = some(obj, 'name');
console.log(result); // true
```
