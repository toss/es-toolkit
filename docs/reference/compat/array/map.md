# map

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns a new array of transformed values based on the provided iteratee.

The iteratee can be specified in several ways:

- **Transformation function**: If you provide a transformation function, the function will be applied to each element.
- **Property key**: If you provide a property key, the function will return the value of the specified property from each element.
- **Object**: If you provide an object, the function will use `isEqual` to compare each element to the object and return `true` if they match.

## Signature

```typescript
function map<T, U>(collection: T[], iteratee: (value: T, index: number, collection: T[]) => U): U[];
function map<T, U>(collection: ArrayLike<T>, iteratee: (value: T, index: number, collection: ArrayLike<T>) => U): U[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: null | undefined): T[];
function map<T extends object, U>(collection: T, iteratee: (value: T[keyof T], key: string, collection: T) => U): U[];
function map<T, K extends keyof T>(collection: Record<string, T> | Record<number, T>, iteratee: K): Array<T[K]>;
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: string): any[];
function map<T>(collection: Record<string, T> | Record<number, T>, iteratee?: object): boolean[];
```

### Parameters

- `collection` (`T[]` | `ArrayLike<T>` | `Record<string, T>` | `Record<number, T>`): The collection to iterate over.

- `iteratee`:

  - **Transformation function** (`(value: T, index: number, collection: T[]) => U`): A function that transforms each element.
  - **Property key** (`K` | `string`): The key of the property to extract from each element.
  - **Object** (`object`): An object to compare each element to.

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
