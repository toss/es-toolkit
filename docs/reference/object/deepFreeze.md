# deepFreeze

Recursively freezes an object, making it and all nested objects and arrays immutable.

```typescript
const frozen = deepFreeze(obj);
```

## Usage

### `deepFreeze(obj)`

Use `deepFreeze` when you want to make an object completely immutable. `Object.freeze` only freezes the top-level properties of an object, so nested objects can still be modified. `deepFreeze` recursively freezes all nested objects and arrays, so nothing can be changed at any depth.

The object is frozen in place and the same reference is returned. Objects that are already frozen are skipped, so circular references are handled safely.

```typescript
import { deepFreeze } from 'es-toolkit/object';

// Nested objects are frozen too
const user = deepFreeze({ name: 'Alex', settings: { theme: 'dark' } });
user.settings.theme = 'light'; // TypeError in strict mode
// user.settings is still { theme: 'dark' }

// Arrays and the objects inside them are also frozen
const config = deepFreeze({ tags: ['admin', 'user'] });
config.tags.push('guest'); // TypeError in strict mode
```

#### Parameters

- `obj` (`T`): The object to freeze deeply.

#### Returns

(`T`): The same object, with itself and all nested objects and arrays frozen.
