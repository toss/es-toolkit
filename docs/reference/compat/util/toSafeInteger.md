# toSafeInteger (Lodash Compatibility)

Converts a value to a safe integer.

```typescript
const result = toSafeInteger(value);
```

## Reference

### `toSafeInteger(value)`

Use `toSafeInteger` when you want to convert a value to a safe integer. A safe integer is an integer that can be accurately represented in JavaScript, within the range of `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(3.2);
// Returns: 3

toSafeInteger(Infinity);
// Returns: 9007199254740991

toSafeInteger('3.2');
// Returns: 3

// String conversion
toSafeInteger('abc');
// Returns: 0

// Handle special values
toSafeInteger(NaN);
// Returns: 0

toSafeInteger(null);
// Returns: 0

toSafeInteger(undefined);
// Returns: 0
```

Infinity values are also limited to the safe range.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(-Infinity);
// Returns: -9007199254740991 (Number.MIN_SAFE_INTEGER)

toSafeInteger(Number.MAX_VALUE);
// Returns: 9007199254740991
```

Useful when using as array indices or ID values.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

function getArrayItem(arr: any[], index: any) {
  const safeIndex = toSafeInteger(index);
  return arr[safeIndex];
}

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(getArrayItem(items, '2.7')); // 'c' (index 2)
console.log(getArrayItem(items, Infinity)); // undefined (out of range)
```

#### Parameters

- `value` (`unknown`): The value to convert.

#### Returns

(`number`): Returns the converted safe integer.
