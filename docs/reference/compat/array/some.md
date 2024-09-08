# some

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

The `some` function checks if at least one element in an array meets a given condition. You can pass a function or a property name of the object in the array.

## Signature

```typescript
function some<T>(
  arr: T[] | null | undefined,
  predicate: ((value: T, index: number, arr: T[]) => unknown) | keyof T
): boolean;
```

### Parameters

- `arr` (`T[] | null | undefined`): The array to check. If it's `null` or `undefined`, the function returns `false`.
- `predicate` (`((value: T, index: number, arr: T[]) => unknown) | keyof T`): A function to test each element, or a property name of the object.

  - If a function is passed, it receives three arguments:

    - `value`: The current element in the array.
    - `index`: The index of the current element.
    - `arr`: The array itself.

  - If a string is passed, the function checks if any object in the array has a truthy value for that property.

### Return Value

- The function returns `true` if at least one element passes the `predicate`. If not, it returns `false`.

## Example

```typescript
some([1, 2, 3], number => number % 2 === 0); // true;
some([1, 'string'], Number); // true
some([false, false, false], value => value); // false
some([1, false, 'string'], () => true); // true
```
