# isArrayLikeObject (Lodash Compatibility)

Checks if a value is an array-like object that is not a primitive.

```typescript
const result = isArrayLikeObject(value);
```

## Reference

### `isArrayLikeObject(value)`

Use `isArrayLikeObject` when you need to check if a given value is an array-like object that is not a primitive. This includes arrays, arguments objects, NodeLists, etc., but excludes strings since they are primitive values.

```typescript
import { isArrayLikeObject } from 'es-toolkit/compat';

// Array-like objects (not primitives)
isArrayLikeObject([1, 2, 3]); // true
isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLikeObject({ length: 0 }); // true

// arguments object
function example() {
  return isArrayLikeObject(arguments); // true
}

// NodeList or HTMLCollection (in browsers)
isArrayLikeObject(document.querySelectorAll('div')); // true

// Primitives are false (including strings)
isArrayLikeObject('abc'); // false
isArrayLikeObject(''); // false
isArrayLikeObject(123); // false
isArrayLikeObject(true); // false

// Other objects
isArrayLikeObject({}); // false
isArrayLikeObject(null); // false
isArrayLikeObject(undefined); // false
isArrayLikeObject(() => {}); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is an array-like object that is not a primitive, otherwise `false`.
