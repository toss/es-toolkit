# toString (Lodash Compatibility)

::: warning Use String constructor instead

This `toString` function performs slowly due to complex array handling and -0 special case processing.

Use the faster and more modern String(value) instead.

:::

Converts a value to a string.

```typescript
const str = toString(value);
```

## Reference

### `toString(value)`

Converts a value to a string. null and undefined become empty strings, and the sign of -0 is preserved.

```typescript
import { toString } from 'es-toolkit/compat';

// Basic types
toString(null);
// Returns: ''

toString(undefined);
// Returns: ''

toString('hello');
// Returns: 'hello'

toString(123);
// Returns: '123'

// Preserve -0 sign
toString(-0);
// Returns: '-0'
```

Arrays are converted recursively.

```typescript
import { toString } from 'es-toolkit/compat';

// Convert array to string
toString([1, 2, 3]);
// Returns: '1,2,3'

// Nested arrays
toString([1, [2, 3], 4]);
// Returns: '1,2,3,4'

// Array containing -0
toString([1, 2, -0]);
// Returns: '1,2,-0'

// Array containing symbols
toString([Symbol('a'), Symbol('b')]);
// Returns: 'Symbol(a),Symbol(b)'
```

#### Parameters

- `value` (`any`): The value to convert.

#### Returns

(`string`): Returns the converted string. null and undefined return empty strings.
