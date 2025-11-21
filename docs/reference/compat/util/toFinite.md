# toFinite (Lodash Compatibility)

Converts a value to a finite number.

```typescript
const finite = toFinite(value);
```

## Usage

### `toFinite(value)`

Converts a value to a finite number. Infinity values are converted to Number.MAX_VALUE, and NaN is treated as 0.

```typescript
import { toFinite } from 'es-toolkit/compat';

// Regular numbers are returned as is
toFinite(3.2);
// Returns: 3.2

// Infinity is converted to MAX_VALUE
toFinite(Infinity);
// Returns: 1.7976931348623157e+308

toFinite(-Infinity);
// Returns: -1.7976931348623157e+308

// String numbers are converted to numbers
toFinite('3.2');
// Returns: 3.2
```

Invalid values are converted to 0.

```typescript
import { toFinite } from 'es-toolkit/compat';

toFinite(NaN);
// Returns: 0

toFinite(Symbol.iterator);
// Returns: 0

toFinite(null);
// Returns: 0
```

#### Parameters

- `value` (`unknown`): The value to convert.

#### Returns

(`number`): Returns the converted finite number.
