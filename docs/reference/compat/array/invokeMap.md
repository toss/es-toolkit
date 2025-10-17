# invokeMap (Lodash Compatibility)

::: warning Use `Array.map` and `Object.values(...).map`

This `invokeMap` function is slow due to handling `null` or `undefined`, method lookups, etc.

Use the faster and more modern `Array.map` and `Object.values(...).map` instead.

For example, `invokeMap([1, 2, 3], 'toString')` can be written as `[1, 2, 3].map(x => x.toString())`.

:::

Invokes the specified method on each element in the array or object and returns an array of results.

```typescript
const result = invokeMap(collection, method, ...args);
```

## Reference

### `invokeMap(collection, method, ...args)`

Invokes the specified method on each element in the array or object. You can pass the method name as a string or pass a function directly. Additional arguments are passed to each method invocation.

```typescript
import { invokeMap } from 'es-toolkit/compat';

// Invoke method on each element of the array
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[5, 1, 7].sort(), [3, 2, 1].sort()]
// => [[1, 5, 7], [1, 2, 3]]

// Invoke method with arguments
invokeMap([123, 456], 'toString', 2);
// => [(123).toString(2), (456).toString(2)]
// => ['1111011', '111001000']

// Pass a function directly
invokeMap(['a', 'b', 'c'], String.prototype.toUpperCase);
// => [String.prototype.toUpperCase('a'), String.prototype.toUpperCase('b'), String.prototype.toUpperCase('c')]
// => ['A', 'B', 'C']
```

For objects, the method is invoked on each value.

```typescript
import { invokeMap } from 'es-toolkit/compat';

const obj = { a: 1.1, b: 2.2, c: 3.3 };
invokeMap(obj, 'toFixed', 1);
// => ['1.1', '2.2', '3.3']
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { invokeMap } from 'es-toolkit/compat';

invokeMap(null, 'toString'); // []
invokeMap(undefined, 'toString'); // []
```

#### Parameters

- `collection` (`ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to invoke the method on.
- `method` (`string | ((...args: any[]) => R)`): The method name or function to invoke.
- `...args` (`any[]`): Additional arguments to pass to each method invocation.

#### Returns

(`Array<R | undefined>`): Returns a new array containing the results of each method invocation.
