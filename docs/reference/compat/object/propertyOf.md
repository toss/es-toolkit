# propertyOf (Lodash compatibility)

::: warning Use `get` function directly

This `propertyOf` function is a wrapper function that internally calls the `get` function, causing additional function call overhead.

Use the faster and more modern `get` function directly or use optional chaining (`?.`) instead.

:::

Creates a function that retrieves values from various paths in a specific object.

```typescript
const getter = propertyOf(obj);
```

## Reference

### `propertyOf(object)`

Use `propertyOf` when you want to create a function that retrieves values from multiple paths in a single object. Unlike `property`, it fixes the object first and allows you to query various paths.

```typescript
import { propertyOf } from 'es-toolkit/compat';

// Basic usage
const data = { name: 'John', age: 30, city: 'New York' };
const getValue = propertyOf(data);

const name = getValue('name');
// Result: 'John'

const age = getValue('age');
// Result: 30

// Deep path access
const complexData = {
  user: { profile: { name: 'Alice', age: 25 } },
  settings: { theme: 'dark', lang: 'en' },
};
const getComplexValue = propertyOf(complexData);

const userName = getComplexValue('user.profile.name');
// Result: 'Alice'

const theme = getComplexValue('settings.theme');
// Result: 'dark'

// Using array path
const arrayPath = getComplexValue(['user', 'profile', 'age']);
// Result: 25

// Process multiple paths as array
const paths = ['user.profile.name', 'settings.theme', 'settings.lang'];
const values = paths.map(getValue);
// Result: ['Alice', 'dark', 'en'] (values from each path)

// Array index access
const arrayData = [10, 20, 30];
const getArrayValue = propertyOf(arrayData);
const firstItem = getArrayValue(0);
// Result: 10

const secondItem = getArrayValue('[1]');
// Result: 20
```

Returns `undefined` if the path doesn't exist.

```typescript
import { propertyOf } from 'es-toolkit/compat';

const data = { a: 1, b: 2 };
const getValue = propertyOf(data);
const missing = getValue('nonexistent.path');
// Result: undefined
```

#### Parameters

- `object` (`T`): The target object to retrieve values from.

#### Returns

(`(path: PropertyPath) => any`): Returns a function that returns the object's value at a given path.
