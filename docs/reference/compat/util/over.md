# over

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes given functions and returns their results as an array.

You can use several types of iteratees:

- **Functions**: Each function is called with the same arguments and the results are collected.
- **Property names**: Each property name is used to extract values from the provided object.
- **Objects**: Each object is used to check if the provided object matches its properties.
- **Property-value pairs**: Each pair checks if the specified property of the provided object matches the value.

## Signature

```typescript
function over(...iteratees: Array<Iteratee | Iteratee[]>): (...args: any[]) => unknown[];
```

### Parameters

- `iteratees` (`Array<Iteratee | Iteratee[]>`): The iteratees to invoke.
  - `Iteratee` is `((...args: any[]) => unknown) | symbol | number | string | object | null`.

### Returns

(`(...args: any[]) => unknown[]`): Returns the new function.

## Examples

```typescript
const func = over([Math.max, Math.min]);
const func2 = over(Math.max, Math.min);
func(1, 2, 3, 4);
// => [4, 1]
func2(1, 2, 3, 4);
// => [4, 1]

const func = over(['a', 'b']);
func({ a: 1, b: 2 });
// => [1, 2]

const func = over([{ a: 1 }, { b: 2 }]);
func({ a: 1, b: 2 });
// => [true, false]

const func = over([['a', 1], ['b', 2]]);
func({ a: 1, b: 2 });
// => [true, true]
```
