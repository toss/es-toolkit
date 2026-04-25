# set (Lodash Compatibility)

::: warning Use direct assignment instead

This `set` function internally calls the `updateWith` function and operates slowly due to complex path processing and object creation logic.

Use faster and more modern direct assignment or destructuring assignment instead.

:::

Sets the value at the specified path of the object.

```typescript
const result = set(obj, path, value);
```

## Usage

### `set(object, path, value)`

Use `set` when you want to set a value at a specific path in an object. If any part of the path doesn't exist, it's automatically created. Useful when dealing with nested objects or arrays.

```typescript
import { set } from 'es-toolkit/compat';

// Basic usage
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// Set value in array
const arr = [1, 2, 3];
set(arr, '1', 4);
console.log(arr[1]); // 4

// Create non-existent path
const empty = {};
set(empty, 'user.profile.name', 'John');
console.log(empty);
// Result: { user: { profile: { name: 'John' } } }

// Use array path
const data = {};
set(data, ['nested', 'array', 0], 'first item');
console.log(data);
// Result: { nested: { array: ['first item'] } }

// Auto-create array indices
const list = {};
set(list, 'items[0]', 'first');
set(list, 'items[2]', 'third');
console.log(list);
// Result: { items: ['first', undefined, 'third'] }

// Mix nested objects and arrays
const complex = {};
set(complex, 'users[0].profile.settings.theme', 'dark');
console.log(complex);
// Result: { users: [{ profile: { settings: { theme: 'dark' } } }] }

// Handle numeric keys
const numeric = {};
set(numeric, 123, 'number key');
console.log(numeric[123]); // 'number key'

// Overwrite existing values
const existing = { a: { b: 'old' } };
set(existing, 'a.b', 'new');
console.log(existing.a.b); // 'new'
```

The original object is directly modified and returned.

```typescript
import { set } from 'es-toolkit/compat';

const original = { x: 1 };
const result = set(original, 'y', 2);

console.log(original === result); // true
console.log(original); // { x: 1, y: 2 }
```

#### Parameters

- `object` (`T`): The object to set the value in.
- `path` (`PropertyPath`): The path of the property to set. Can be a string, array, or array of keys.
- `value` (`any`): The value to set.

#### Returns

(`T`): Returns the modified object (same as the original object).
