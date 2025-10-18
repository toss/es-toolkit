# result (Lodash Compatibility)

::: warning Use the `get` function or optional chaining

This `result` function performs slowly due to complex path handling and function invocation logic.

Instead, use the faster and more modern `get` function or optional chaining (`?.`).

:::

Retrieves a value from a path in an object, but if it encounters a function, it calls it and returns the result.

```typescript
const result = result(obj, path, defaultValue);
```

## Reference

### `result(object, path, defaultValue)`

Use `result` when you want to retrieve a value from a path in an object and automatically call any functions along the path. It's similar to the `get` function, but it executes functions it encounters and returns the result if the final value is also a function.

```typescript
import { result } from 'es-toolkit/compat';

// Basic usage (regular values)
const obj = { a: { b: { c: 3 } } };
const value = result(obj, 'a.b.c');
// Result: 3

// Automatic function invocation
const objWithFunc = {
  compute: () => ({ value: 42 }),
  getValue: function () {
    return this.compute().value;
  },
};
const computed = result(objWithFunc, 'getValue');
// Result: 42 (getValue function is called)

// Function invocation along the path
const nested = {
  data: () => ({ user: { getName: () => 'John' } }),
};
const name = result(nested, 'data.user.getName');
// Result: 'John' (both data() and getName() are called)

// Using default value
const incomplete = { a: { b: null } };
const withDefault = result(incomplete, 'a.b.c', 'default value');
// Result: 'default value'

// When default value is a function
const withFuncDefault = result(incomplete, 'a.b.c', () => 'computed default');
// Result: 'computed default' (default value function is called)

// Using array path
const arrayPath = result(objWithFunc, ['getValue']);
// Result: 42

// Dynamic default value
const dynamic = result(incomplete, 'missing.path', function () {
  return `Generated at ${new Date().toISOString()}`;
});
// Result: string with current time
```

The `this` context is preserved when calling functions.

```typescript
import { result } from 'es-toolkit/compat';

const calculator = {
  multiplier: 2,
  compute: function () {
    return 10 * this.multiplier;
  },
};

const calculatedValue = result(calculator, 'compute');
// Result: 20 (this.multiplier is correctly referenced)
```

#### Parameters

- `object` (`any`): The object to query.
- `path` (`PropertyPath`): The path of the property to get. Can be a string, array, or array of keys.
- `defaultValue` (`R | ((...args: any[]) => R)`, optional): The default value to return if the value is `undefined`. If it's a function, it calls and returns the result.

#### Returns

(`R`): Returns the resolved value. Functions along the path are called, and if the final value is also a function, it returns the result of calling it.
