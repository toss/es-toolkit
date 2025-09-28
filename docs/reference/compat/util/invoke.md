# invoke (Lodash Compatibility)

::: warning Call methods directly

This `invoke` function performs slower due to complex processing like path resolution, object traversal, and `get` function calls.

Instead, use faster and more modern direct method calls.

:::

Invokes the method at the path of the object with the given arguments.

```typescript
const result = invoke(object, path, args);
```

## Reference

### `invoke(object, path, args)`

Use `invoke` when you want to call a method at a specific path of an object with arguments. The path can be specified as a dot notation string or an array of property keys.

```typescript
import { invoke } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// Specify path using dot notation
invoke(object, 'a.b', [1, 2]);
// Returns: 3

// Specify path using array
invoke(object, ['a', 'b'], [1, 2]);
// Returns: 3

// Non-existent path
invoke(object, 'a.c.d', [1, 2]);
// Returns: undefined

// Various types of arguments
const obj = {
  calculate: {
    sum: function (...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    },
    multiply: function (a, b) {
      return a * b;
    },
  },
};

invoke(obj, 'calculate.sum', [1, 2, 3, 4]);
// Returns: 10

invoke(obj, ['calculate', 'multiply'], [5, 6]);
// Returns: 30
```

#### Parameters

- `object` (`unknown`): The object to invoke the method on.
- `path` (`PropertyKey | PropertyKey[]`): The path of the method to invoke. Can be a string, symbol, number, or an array of these.
- `args` (`any[]`): The array of arguments to invoke the method with.

#### Returns

(`any`): Returns the result of the invoked method. If the method doesn't exist, returns `undefined`.
