# map

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Transforms each element of an array and returns a new array.

The way each element is transformed can be specified according to the behavior of the [iteratee](../util/iteratee.md) function.

- **Transformation function**: Executes a given function on each element and transforms it to the result.
- **Property name**: Selects the specified property name from each element.
- **Property-value pair**: Transforms each element to a boolean indicating whether the element's property matches the given value.
- **Partial object**: Transforms each element to a boolean indicating whether the element matches the properties and values of the partial object.

## Signature

```typescript
function map<T, U>(arr: T[], iteratee: (value: T, index: number, arr: T[]) => U): U[];
function map<T>(arr: T[], iteratee: Partial<T>): boolean[];
function map<T>(arr: T[], iteratee: [keyof T, unknown]): boolean[];
function map<T, K extends keyof T>(arr: T[], iteratee: K): Array<T[K]>;
function map<T>(arr: T[], iteratee?: null | undefined): T[];

function map<T extends object, U>(object: T, iteratee: (value: T[keyof T], key: string, object: T) => U): U[];
function map<T>(object: T, iteratee: Partial<T[keyof T]>): boolean[];
function map<T>(object: T, iteratee: [keyof T[keyof T], unknown]): boolean[];
function map<T, K extends keyof T[keyof T]>(object: T, iteratee: K): Array<T[keyof T][K]>;
function map<T extends object, U>(object: T, iteratee?: null | undefined): U[];
```

### Parameters

- `arr` (`T[]`) or `object` (`T`): The array or object to transform.

::: info `arr` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `map` function handles `arr` as follows:

- If `arr` is `ArrayLike<T>`, it is converted to an array using `Array.from(...)`.
- If `arr` is `null` or `undefined`, it is treated as an empty array.

:::

::: info `object` can be `null` or `undefined`

To ensure full compatibility with lodash, the `map` function handles `object` as follows:

- If `object` is `null` or `undefined`, it is converted to an empty object.

:::

- `iteratee`:

  - For arrays:

    - **Transformation function** (`(value: T, index: number, arr: T[]) => U`): A function to transform each element of the array.
    - **Property name** (`keyof T`): The property name to select from each element.
    - **Property-value pair** (`[keyof T, unknown]`): A tuple where the first element is the property to match, and the second is the value to match.
    - **Partial object** (`Partial<T>`): A partial object specifying properties and values to match.

  - For objects:

    - **Transformation function** (`(item: T[keyof T], index: number, object: T) => unknown`): A function to transform each value of the object.
    - **Property name** (`keyof T[keyof T]`): The property name to select from each value of the object.
    - **Property-value pair** (`[keyof T[keyof T], unknown]`): A tuple where the first element is the property to match, and the second is the value to match.
    - **Partial object** (`Partial<T[keyof T]>`): A partial object specifying properties and values to match.

### Returns

(`any[]`): A new array of transformed values.

### Example

```typescript
// Using a transformation function
const array = [1, 2, 3];
map(array, value => value * 2); // => [2, 4, 6]

// Using a property key as the iteratee
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, 'a'); // => [1, 2, 3]

// Using an object as the iteratee
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
map(objects, { a: 1 }); // => [true, false, false]

// No iteratee
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// Using an object as the collection
const obj = { a: 1, b: 2, c: 3 };
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
