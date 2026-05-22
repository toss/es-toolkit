# isArray (Lodash Compatibility)

::: warning Use `Array.isArray`

This `isArray` function operates slowly due to additional function calls.

Instead, use the faster and modern `Array.isArray`.

:::

Checks if a value is an array.

```typescript
const result = isArray(value);
```

## Usage

### `isArray(value)`

Use `isArray` when you want to check if a value is an array. This function also works as a type guard in TypeScript.

```typescript
import { isArray } from 'es-toolkit/compat';

// Array check
isArray([1, 2, 3]);
// Returns: true

isArray('abc');
// Returns: false

isArray(() => {});
// Returns: false

// Distinguish from objects
isArray({ 0: 'a', 1: 'b', length: 2 });
// Returns: false

isArray(null);
// Returns: false
```

#### Parameters

- `value` (`unknown`): The value to check if it's an array.

#### Returns

(`value is any[]`): Returns `true` if the value is an array, otherwise `false`.
