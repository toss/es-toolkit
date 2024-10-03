# every

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if all elements in an array or object meet the specified condition.

You can specify the condition in several ways:

- **Predicate function**: If you provide a predicate function, the function will be applied to each item. If the predicate function returns `true` for all items, the result will be `true`.
- **Partial object**: If you provide a partial object, the function will return `true` if all items match the properties of the partial object.
- **Property-value pair**: If you provide a property-value pair, the function will return `true` if all items match the property and value from the pair.
- **Property name**: If you provide a property name, the function will return `true` if all items have the specified property with a truthy value.

## Signature

```typescript
function every<T>(arr: T[]): boolean;
function every<T>(arr: T[], doesMatch: (item: T, index: number, arr: T[]) => unknown): boolean;
function every<T>(arr: T[], doesMatch: Partial<T>): boolean;
function every<T>(arr: T[], doesMatch: [keyof T, unknown]): boolean;
function every<T>(arr: T[], doesMatch: string): boolean;

function every<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: [keyof T, unknown]): boolean;
function every<T extends Record<string, unknown>>(object: T, doesMatch: string): boolean;
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to search through.

- `doesMatch`:

  - For the first `every` overload with arrays:

    - **Predicate function** (`(item: T, index: number, arr: T[]) => unknown`): A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
    - **Partial object** (`Partial<T>`): A partial object that specifies the properties to match.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`string`): The name of the property to check for a truthy value.

  - For the `every` overloads with objects:
    - **Predicate function** (`(value: T[keyof T], key: keyof T, object: T) => unknown`): A function that takes an value, its key, and the object, and returns a truthy value if the item matches the criteria.
    - **Partial value** (`Partial<T[keyof T]>`): A partial value to match against the values of the object.
    - **Property-value pair** (`[keyof T, unknown]`): An array where the first element is the property key and the second element is the value to match.
    - **Property name** (`string`): The name of the property to check for a truthy value.

### Returns

(`boolean`): Returns `true` if all items match the specified condition, or `false` if any item does not match.

## Examples

### Arrays

```typescript
import { every } from 'es-toolkit/compat';

// Using a predicate function
const items = [1, 2, 3, 4, 5];
const result = every(items, item => item > 0);
console.log(result); // true

// Using a partial object
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, { name: 'Bob' });
console.log(result); // false

// Using a property-value pair
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, ['name', 'Alice']);
console.log(result); // false

// Using a property name
const items = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const result = every(items, 'name');
console.log(result); // true
```

### Objects

```typescript
import { every } from 'es-toolkit/compat';

// Using a predicate function
const obj = { a: 1, b: 2, c: 3 };
const result = every(obj, value => value > 0);
console.log(result); // true

// Using a partial value
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, { name: 'Bob' });
console.log(result); // false

// Using a property-value pair
const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
const result = every(obj, ['name', 'Alice']);
console.log(result); // false

// Using a property name
const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
const result = every(obj, 'name');
console.log(result); // true
```
