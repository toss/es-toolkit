# map

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Iterates over elements in a collection and applies a transformation function, returning a new array of results. 
This method works with arrays, objects, and other types, ensuring compatibility across different types of collections. 
If no iteratee is provided, the function returns the original elements of the collection.

## Signature

```typescript
function map<T, U>(
  collection: T[] | Record<string, T> | number | string | boolean | null | undefined,
  iteratee?: ((value: T, key: string | number) => U) | keyof T | null
): U[];
```

### Parameters
- `collection` (`T[] | Record<string, T> | number | string | boolean | null | undefined`): The collection to iterate over. It can be an array, an object, or a primitive type. If the collection is `null` or `undefined`, an empty array is returned.
- `iteratee` (`(value: T, key: string | number) => U | keyof T | null`, optional): The function invoked per iteration. If it's a function, it will be used to transform each element. If it's a property key (i.e., `keyof T`), the value of that property will be returned for each element. If no iteratee is provided, the function returns the original elements.

### Returns
(`U[]`): A new array of transformed values.

### Example

```typescript
// Using a transformation function
const array = [1, 2, 3];
map(array, (value) => value * 2); // => [2, 4, 6]

// Using a property key as the iteratee
const objects = [{a: 1}, {a: 2}, {a: 3}];
map(objects, 'a'); // => [1, 2, 3]

// No iteratee
const numbers = [1, 2, 3];
map(numbers); // => [1, 2, 3]

// Using an object
const obj = {a: 1, b: 2, c: 3};
map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
```
