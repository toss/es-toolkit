# transform

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash, as detailed [here](../../../compatibility.md).
:::

Traverses object values and creates a new object by accumulating them in the desired form.

If no initial value is provided for `accumulator`, it creates a new array or object with the same prototype.

The traversal is interrupted when the `iteratee` function returns `false`.

## Interface

```typescript
export function transform<T, U>(
  object: readonly T[],
  iteratee?: (acc: U, curr: T, index: number, arr: readonly T[]) => void,
  accumulator?: U
): U;

export function transform<T, U>(
  object: Record<string, T>,
  iteratee?: (acc: U, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: U
): U;

export function transform<T extends object, U>(
  object: T,
  iteratee?: (acc: U, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: U
): U;
```

### Parameters

- `object` (`readonly T[] | T`): The object to iterate over.
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown`): The function called for each iteration.
- `accumulator` (`U`): The initial value.

### Returns

(`U`): Returns the accumulated value.

## Examples

```typescript
// Transform an array
const array = [2, 3, 4];
transform(
  array,
  (acc, value) => {
    acc += value;
    return value % 2 === 0;
  },
  0
); // => 5

// Transform an object
const obj = { a: 1, b: 2, c: 1 };
transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
); // => { '1': ['a', 'c'], '2': ['b'] }
```
