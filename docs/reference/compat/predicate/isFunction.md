# isFunction (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isFunction](../../predicate/isFunction.md) instead
This `isFunction` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isFunction](../../predicate/isFunction.md) instead.
:::

Checks if a value is a function.

```typescript
const result = isFunction(value);
```

## Usage

### `isFunction(value)`

Use `isFunction` when you want to type-safely check if a value is a function. It also works as a type guard in TypeScript.

```typescript
import { isFunction } from 'es-toolkit/compat';

// Regular functions
isFunction(function () {}); // true
isFunction(() => {}); // true

// Built-in functions and constructors
isFunction(Array.prototype.slice); // true
isFunction(Proxy); // true
isFunction(Int8Array); // true

// Async functions and generator functions
isFunction(async function () {}); // true
isFunction(function* () {}); // true

// Other types return false
isFunction('function'); // false
isFunction({}); // false
isFunction([]); // false
isFunction(null); // false
isFunction(undefined); // false
isFunction(123); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a function.

#### Returns

(`boolean`): Returns `true` if the value is a function, `false` otherwise.
