# over (Lodash Compatibility)

::: warning Use array methods directly instead

This `over` function incurs additional overhead in the process of mapping functions to arrays.

Use the faster and more modern array `map` method instead.

:::

Creates a function that passes the same arguments to given functions and returns the results as an array.

```typescript
const multiCall = over(funcs);
```

## Usage

### `over(...iteratees)`

Takes multiple functions and creates a function that calls each with the same arguments and returns the results as an array. This is useful for performing multiple calculations on the same data.

```typescript
import { over } from 'es-toolkit/compat';

// Use math functions together
const mathOperations = over([Math.max, Math.min]);
mathOperations(1, 2, 3, 4);
// => [4, 1]

// Can also pass individual functions
const operations = over(Math.max, Math.min);
operations(1, 2, 3, 4);
// => [4, 1]

// Extract object properties
const getProperties = over(['name', 'age']);
getProperties({ name: 'John', age: 30 });
// => ['John', 30]

// Check conditions
const validators = over([
  { name: 'John' }, // Object matching
  { age: 30 },
]);
validators({ name: 'John', age: 30 });
// => [true, true]
```

It can also handle nested paths.

```typescript
import { over } from 'es-toolkit/compat';

const data = {
  user: { name: 'John', profile: { age: 30 } },
  settings: { theme: 'dark' },
};

const getInfo = over(['user.name', 'user.profile.age', 'settings.theme']);
getInfo(data);
// => ['John', 30, 'dark']
```

#### Parameters

- `...iteratees` (`Array<Function | string | object | Array>`): The functions to call or property paths. Can be passed as an array or individual arguments.

#### Returns

(`(...args: any[]) => any[]`): Returns a function that takes arguments and returns an array of results from each function.
