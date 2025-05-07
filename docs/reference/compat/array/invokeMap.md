# invokeMap

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed @here.
:::

Invokes the method at `path` of each element in `collection`, returning an array of the results of each invoked method. Any additional arguments are provided to each invoked method. If `path` is a function, it's invoked for, and `this` bound to, each element in `collection`.

## Signature

```typescript
function invokeMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  path: PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R),
  ...args: unknown[]
): Array<R | undefined>;
```

### Parameters

- `collection` (`T[] | Record<string, T> | null | undefined`): The collection to iterate over.
- `path` (`PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R)`): The path of the method to invoke (string, number, symbol, or an array of these) or the function to invoke.
- `args` (`...unknown[]`): The arguments to invoke each method with.

### Returns

(`Array<R | undefined>`): Returns the array of results. Elements are `undefined` if the path is not found or the method invocation results in `undefined`.

## Examples

```typescript
import { invokeMap } from 'es-toolkit/compat';

// Invoke a method on each element
invokeMap(['a', 'b', 'c'], 'toUpperCase');
// => ['A', 'B', 'C']

// Invoke a method with arguments
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[1, 5, 7], [1, 2, 3]]

// Invoke a method on each value in an object
invokeMap({ a: 1, b: 2, c: 3 }, 'toFixed', 1);
// => ['1.0', '2.0', '3.0']

// Use a function instead of a method name
invokeMap(
  ['a', 'b', 'c'],
  function (this: string, prefix: string, suffix: string) {
    return prefix + this.toUpperCase() + suffix;
  },
  '(',
  ')'
);
// => ['(A)', '(B)', '(C)']

invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```
