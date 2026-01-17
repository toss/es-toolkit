# isEmptyObject

Checks if a plain object has no properties (`{}`).

```typescript
const result = isEmptyObject(value);
```

## Usage

### `isEmptyObject(value)`

Use `isEmptyObject` when you want to check if a plain object has no properties like `{}`. Returns `false` for other object types like arrays, Map, or Set.

```typescript
import { isEmptyObject } from 'es-toolkit';

// Plain objects with no properties
isEmptyObject({}); // true
isEmptyObject(new Object()); // true
isEmptyObject(Object.create(null)); // true

// Objects with properties
isEmptyObject({ a: 1 }); // false
isEmptyObject({ key: 'value' }); // false

// Non-plain object types
isEmptyObject([]); // false (array)
isEmptyObject(null); // false
isEmptyObject(new Map()); // false
isEmptyObject(new Set()); // false
```

#### Parameters

- `value` (`unknown`): The value to check.

#### Returns

(`value is Record<PropertyKey, never>`): Returns `true` if it's a plain object with no properties, `false` otherwise.
