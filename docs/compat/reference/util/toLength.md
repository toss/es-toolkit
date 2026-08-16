# toLength (Lodash Compatibility)

Converts a value to a valid array index.

```typescript
const length = toLength(value);
```

## Usage

### `toLength(value)`

Converts a value to a valid array index. Limits to an integer between 0 and 2^32-1.

```typescript
import { toLength } from 'es-toolkit/compat';

// Convert decimal to integer
toLength(3.2);
// Returns: 3

// Negative numbers become 0
toLength(-1);
// Returns: 0

// Convert string numbers
toLength('42');
// Returns: 42

// Very large numbers are limited to the maximum value
toLength(Number.MAX_VALUE);
// Returns: 4294967295
```

null or undefined are converted to 0.

```typescript
import { toLength } from 'es-toolkit/compat';

toLength(null);
// Returns: 0

toLength(undefined);
// Returns: 0
```

#### Parameters

- `value` (`unknown`): The value to convert.

#### Returns

(`number`): Returns a valid array index between 0 and 2^32-1.
