# over

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns a function that invokes iteratees with the arguments provided to the created function and returns
their results.

You can use several types of iteratees:

- **Functions**: Each function is called with the same arguments and the results are collected.
- **Property names**: Each property name is used to extract values from the provided object.
- **Objects**: Each object is used to check if the provided object matches its properties.
- **Property-value pairs**: Each pair checks if the specified property of the provided object matches the value.

## Signature

```typescript
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### Parameters

- `iteratees` (`Array<((...args: any[]) => unknown) | symbol | number | string | object | null>`): The iteratees to invoke.

### Returns

(`Function`): Returns the new function.

## Examples

```typescript
const func = over([Math.max, Math.min]);
func(1, 2, 3, 4);
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

// It handles nullish values at runtime, but will cause TypeScript type errors
// Note: This behavior is deliberately implemented to match lodash's functionality exactly
const func = over([null, undefined]);
func('a', 'b', 'c');
// => ['a', 'a']

// If no iteratees are provided, it returns an empty array
const emptyFunc = over([]);
emptyFunc(1, 2, 3);
// => []
```
