# flatMapDepth

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Maps each element in an array or object using an iteratee function and flattens the result up to the specified depth.

## Signature

```typescript
function flatMapDepth<T>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | null
    | undefined
): T[];

function flatMapDepth<T, R>(
  array: ArrayLike<T> | null | undefined,
  iteratee: (value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth<T extends object, R>(
  collection: T,
  iteratee: (value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R,
  depth?: number
): R[];

function flatMapDepth(collection: object | null | undefined, path: string, depth?: number): any[];

function flatMapDepth(collection: object | null | undefined, matches: object, depth?: number): boolean[];
```

### Parameters

- `collection` (`Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | null | undefined`): The array or object to iterate over.
- `iteratee`: The function invoked per iteration. Defaults to `identity`.
  - `(value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R`: Function called for each element.
  - `(value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R`: Function called for each property.
  - `string`: The path of the property to extract.
  - `object`: The object to match against.
- `depth` (`number`): The maximum recursion depth. Defaults to `1`.

### Returns

- (`T[] | R[] | any[] | boolean[]`): Returns the new flattened array.

## Examples

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// Basic example with a function returning arrays
function duplicate(n) {
  return [n, n];
}

flatMapDepth([1, 2], duplicate);
// => [1, 1, 2, 2]

// Specifying depth
flatMapDepth(
  [
    [
      [1, 2],
      [3, 4],
    ],
  ],
  n => [n, n],
  2
);
// => [1, 1, 2, 2, 3, 3, 4, 4]

// Using matches object
flatMapDepth({ a: 1, b: 2 }, { a: 1 });
// => [true, false]

// Using property path
flatMapDepth({ a: { a: 1, b: 2 } }, 'a');
// => [1, 2]
```
