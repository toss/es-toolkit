# isObjectLike (Lodash Compatibility)

Checks if a value is object-like.

```typescript
const result = isObjectLike(value);
```

## Reference

### `isObjectLike(value)`

Use `isObjectLike` when you need to check if a given value is object-like. An object-like value is a value where the result of the `typeof` operation is `'object'` and is not `null`.

```typescript
import { isObjectLike } from 'es-toolkit/compat';

// Object-like values
isObjectLike({ a: 1 }); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(new Date()); // true
isObjectLike(/regex/); // true
isObjectLike(new Map()); // true
isObjectLike(new Set()); // true

// Non object-like values
isObjectLike('abc'); // false
isObjectLike(123); // false
isObjectLike(true); // false
isObjectLike(() => {}); // false
isObjectLike(Symbol('sym')); // false

// Special cases
isObjectLike(null); // false (null has typeof 'object' but is not object-like)
isObjectLike(undefined); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is object-like, otherwise `false`.
