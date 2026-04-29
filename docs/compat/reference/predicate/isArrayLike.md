# isArrayLike (Lodash Compatibility)

Checks if a value is an array-like object.

```typescript
const result = isArrayLike(value);
```

## Usage

### `isArrayLike(value)`

Use `isArrayLike` when you need to check if a given value is an array-like object. Arrays, strings, arguments objects, and NodeLists are all considered array-like objects.

```typescript
import { isArrayLike } from 'es-toolkit/compat';

// Arrays and strings
isArrayLike([1, 2, 3]); // true
isArrayLike('abc'); // true
isArrayLike(''); // true

// Array-like objects
isArrayLike({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLike({ length: 0 }); // true

// arguments object
function example() {
  return isArrayLike(arguments); // true
}

// Non-array-like values
isArrayLike({}); // false
isArrayLike({ length: 'invalid' }); // false
isArrayLike(null); // false
isArrayLike(undefined); // false
isArrayLike(() => {}); // false
isArrayLike(123); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is an array-like object, otherwise `false`.
