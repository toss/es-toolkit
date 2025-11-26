# isSafeInteger (Lodash Compatibility)

::: warning Use `Number.isSafeInteger`

This `isSafeInteger` function operates slowly due to additional type checking overhead.

Instead, use the faster and modern `Number.isSafeInteger`.

:::

Checks if a value is a safe integer.

```typescript
const result = isSafeInteger(value);
```

## Usage

### `isSafeInteger(value)`

Use `isSafeInteger` when you need to check if a given value is a safe integer. A safe integer is an integer between -(2^53 - 1) and (2^53 - 1), which can be accurately represented in JavaScript.

```typescript
import { isSafeInteger } from 'es-toolkit/compat';

// Safe integers
isSafeInteger(3); // true
isSafeInteger(-42); // true
isSafeInteger(0); // true
isSafeInteger(Number.MAX_SAFE_INTEGER); // true (9007199254740991)
isSafeInteger(Number.MIN_SAFE_INTEGER); // true (-9007199254740991)

// Unsafe integers
isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
isSafeInteger(9007199254740992); // false

// Non-integer values
isSafeInteger(3.14); // false
isSafeInteger('3'); // false
isSafeInteger(1n); // false (BigInt)
isSafeInteger([]); // false
isSafeInteger({}); // false
isSafeInteger(null); // false
isSafeInteger(undefined); // false

// Infinity and NaN
isSafeInteger(Infinity); // false
isSafeInteger(-Infinity); // false
isSafeInteger(NaN); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`) Returns `true` if the value is a safe integer, otherwise `false`.  
When `true`, TypeScript narrows the type of `value` to `number`.
