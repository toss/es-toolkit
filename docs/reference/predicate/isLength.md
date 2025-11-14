# isLength

Checks if a value is a valid array length.

```typescript
const result = isLength(value);
```

## Usage

### `isLength(value)`

Use `isLength` when you want to check if a value is a valid array length. A valid length must be an integer between 0 and `Number.MAX_SAFE_INTEGER`.

```typescript
import { isLength } from 'es-toolkit/predicate';

// Valid lengths
console.log(isLength(0)); // true
console.log(isLength(42)); // true
console.log(isLength(Number.MAX_SAFE_INTEGER)); // true

// Invalid lengths
console.log(isLength(-1)); // false (negative)
console.log(isLength(1.5)); // false (decimal)
console.log(isLength(Number.MAX_SAFE_INTEGER + 1)); // false (unsafe integer)
console.log(isLength('42')); // false (string)
console.log(isLength(null)); // false (null)
```

Can also be used as a type guard in TypeScript.

```typescript
function processLength(value: unknown) {
  if (isLength(value)) {
    // Now value is narrowed to number type
    console.log(value.toFixed(2));
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a valid length.

#### Returns

(`value is number`): Returns `true` if the value is a valid length, `false` otherwise.
