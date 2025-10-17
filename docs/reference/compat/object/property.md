# property (Lodash compatibility)

::: warning Use `get` function directly

This `property` function is a wrapper function that internally calls the `get` function, causing additional function call overhead.

Use the faster and more modern `get` function directly or use optional chaining (`?.`) instead.

:::

Creates a function that retrieves the value at a specified path.

```typescript
const getter = property(path);
```

## Reference

### `property(path)`

Use `property` when you want to create a function that retrieves values from a specific path. The created function can be reused across multiple objects, making it convenient to use with array methods.

```typescript
import { property } from 'es-toolkit/compat';

// Basic usage
const getName = property('name');
const user = { name: 'John', age: 30 };
const result = getName(user);
// Result: 'John'

// Deep path access
const getNestedValue = property('user.profile.name');
const data = { user: { profile: { name: 'Alice', age: 25 } } };
const nestedResult = getNestedValue(data);
// Result: 'Alice'

// Using array path
const getByArray = property(['user', 'profile', 'name']);
const arrayResult = getByArray(data);
// Result: 'Alice'

// Use with array methods
const users = [
  { user: { profile: { name: 'John' } } },
  { user: { profile: { name: 'Jane' } } },
  { user: { profile: { name: 'Bob' } } }
];
const names = users.map(property('user.profile.name'));
// Result: ['John', 'Jane', 'Bob']

// Array index access
const getFirstItem = property('[0]');
const items = ['first', 'second', 'third'];
const firstItem = getFirstItem(items);
// Result: 'first'

// Number key access
const getIndex = property(1);
const arr = ['a', 'b', 'c'];
const secondItem = getIndex(arr);
// Result: 'b'
```

Returns `undefined` if the path doesn't exist.

```typescript
import { property } from 'es-toolkit/compat';

const getMissing = property('nonexistent.path');
const result = getMissing({ some: 'data' });
// Result: undefined
```

#### Parameters

- `path` (`PropertyPath`): The path to retrieve the value from. Can be a string, number, symbol, or an array of these.

#### Returns

(`(object: T) => R`): Returns a function that returns the value at the specified path from a given object.
