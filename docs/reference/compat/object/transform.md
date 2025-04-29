# transform

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Transforms any collection (array or object) into a new result by applying an iteratee function.

The `transform()` function goes through each property in your array or object, letting you build up a new result.
For each property, it calls your iteratee function with the current accumulator and property value.
You can modify the accumulator however you want, and the final accumulator becomes your result.

If you don't provide an accumulator, it creates a new array or object with the same prototype as the original.
You can also stop the transformation early by returning `false` from your iteratee function.

## Signature

```typescript
function transform<T, U>(object?: T[], iteratee?: ((accumulator: U, value: T, index: number, object: T[]) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T extends object, U>(object?: T, iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T, U>(object?: T[] | T | null | undefined, iteratee?: ((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
```

### Parameters

- `object` (`readonly T[] | T | null | undefined`): The object to iterate over.
- `iteratee` (`((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null`): The function invoked per iteration.
- `accumulator` (`U | undefined | null`): The initial value.

### Returns

(`U | undefined | null`): Returns the accumulated value.

## Examples

```typescript
// Transform an array
const array = [2, 3, 4];
transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5

// Transform an object
const obj = { 'a': 1, 'b': 2, 'c': 1 };
transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
```