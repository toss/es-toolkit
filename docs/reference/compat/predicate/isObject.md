# isObject (Lodash Compatibility)

Checks if a value is an object.

```typescript
const result = isObject(value);
```

## Reference

### `isObject(value)`

Use `isObject` when you want to check if a value is an object. In JavaScript, arrays, functions, objects, regular expressions, dates, etc. are all treated as objects.

```typescript
import { isObject } from 'es-toolkit/compat';

// Plain objects
isObject({});
// Returns: true

// Arrays are also objects
isObject([1, 2, 3]);
// Returns: true

// Functions are also objects
isObject(() => {});
// Returns: true

// Dates are also objects
isObject(new Date());
// Returns: true

// null is not an object
isObject(null);
// Returns: false

// Primitive types are not objects
isObject('string');
// Returns: false

isObject(123);
// Returns: false
```

#### Parameters

- `value` (`unknown`): The value to check if it's an object.

#### Returns

(`value is object`): Returns `true` if the value is an object, otherwise `false`.
