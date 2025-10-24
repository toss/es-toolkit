# get (Lodash Compatibility)

::: warning Use dot notation or bracket notation instead

This `get` function performs slowly due to complex path parsing, handling `null` or `undefined`, and default value processing.

Instead, use the faster and more modern dot notation (`.`), bracket notation (`[]`), or optional chaining (`?.`).

:::

Gets the value at the specified path of an object.

```typescript
const value = get(object, path, defaultValue);
```

## Reference

### `get(object, path, defaultValue?)`

Use `get` to safely retrieve a value from an object path. When the path doesn't exist or the value is `undefined`, it returns the default value.

```typescript
import { get } from 'es-toolkit/compat';

// Access nested object with dot notation
const object = { a: { b: { c: 3 } } };
get(object, 'a.b.c');
// => 3

// Access with array notation
get(object, ['a', 'b', 'c']);
// => 3

// Provide default value for non-existent path
get(object, 'a.b.d', 'default');
// => 'default'

// Path with array index
const arrayObject = { users: [{ name: 'john' }, { name: 'jane' }] };
get(arrayObject, 'users[0].name');
// => 'john'
```

Safely accesses `null` or `undefined` objects.

```typescript
import { get } from 'es-toolkit/compat';

get(null, 'a.b.c', 'default');
// => 'default'

get(undefined, ['a', 'b'], 'default');
// => 'default'
```

#### Parameters

- `object` (`any`): The object to query.
- `path` (`PropertyPath`): The path of the property to get. Can be represented as a string, number, symbol, or array.
- `defaultValue` (`any`, optional): The default value to return when the value is `undefined`.

#### Returns

(`any`): Returns the resolved value or the default value.
