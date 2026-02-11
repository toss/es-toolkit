# isNumber

Checks if a value is a number type.

```typescript
const result = isNumber(value);
```

## Usage

### `isNumber(value)`

Use `isNumber` when you want to check if a value is a number.

```typescript
import { isNumber } from 'es-toolkit';

// Checking basic number values
isNumber(123); // true
isNumber(3.14); // true
isNumber(NaN); // true
isNumber(Infinity); // true

// Distinguishing from other types
isNumber('123'); // false
isNumber(true); // false
isNumber(null); // false
isNumber(undefined); // false
```

Particularly useful when used as a type guard in TypeScript.

```typescript
import { isNumber } from 'es-toolkit';

function processValue(value: unknown) {
  if (isNumber(value)) {
    // value is narrowed to number
    console.log(value * 2);
  } else {
    console.log('Not a number');
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a number type.

#### Returns

(`value is number`): Returns `true` if the value is a number, `false` otherwise.
