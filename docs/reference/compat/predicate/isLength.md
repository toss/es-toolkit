# isLength (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isLength](../../predicate/isLength.md) instead
This `isLength` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isLength](../../predicate/isLength.md) instead.
:::

Checks if a value is a valid length.

```typescript
const result = isLength(value);
```

## Usage

### `isLength(value)`

Use `isLength` when you want to check if a value is a valid length. A valid length is a number type, non-negative integer, and below JavaScript's maximum safe integer (`Number.MAX_SAFE_INTEGER`). It also works as a type guard in TypeScript.

```typescript
import { isLength } from 'es-toolkit/compat';

// Valid lengths
isLength(0); // true
isLength(42); // true
isLength(100); // true
isLength(Number.MAX_SAFE_INTEGER); // true

// Invalid lengths
isLength(-1); // false (negative)
isLength(1.5); // false (not an integer)
isLength(Number.MAX_SAFE_INTEGER + 1); // false (exceeds safe range)
isLength('3'); // false (string)
isLength(null); // false
isLength(undefined); // false
isLength({}); // false
isLength([]); // false
```

It's useful for validating the length property of arrays or strings.

```typescript
import { isLength } from 'es-toolkit/compat';

function validateArrayLength(arr: any[]) {
  if (isLength(arr.length)) {
    console.log(`Array length ${arr.length} is valid`);
    return true;
  }
  return false;
}

validateArrayLength([1, 2, 3]); // "Array length 3 is valid"
```

#### Parameters

- `value` (`any`): The value to check if it's a valid length.

#### Returns

(`boolean`): Returns `true` if the value is a valid length, `false` otherwise.
