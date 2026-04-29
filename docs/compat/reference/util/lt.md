# lt (Lodash Compatibility)

::: warning Use the `<` operator instead

This `lt` function performs slower due to additional processing like `toNumber` function calls and string type checking.

Instead, use the faster and more modern `<` operator.

:::

Checks if value is less than other.

```typescript
const result = lt(value, other);
```

## Usage

### `lt(value, other)`

Use `lt` when you want to compare two values to check if the first value is less than the second. Strings are compared lexicographically, and other types are converted to numbers for comparison.

```typescript
import { lt } from 'es-toolkit/compat';

lt(1, 3);
// Returns: true

lt(3, 3);
// Returns: false

lt(3, 1);
// Returns: false

// String comparison (lexicographical)
lt('abc', 'def');
// Returns: true

lt('def', 'abc');
// Returns: false

// Other types are converted to numbers for comparison
lt('5', 10);
// Returns: true (5 < 10)

lt(null, 1);
// Returns: true (0 < 1)
```

#### Parameters

- `value` (`unknown`): The first value to compare.
- `other` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the first value is less than the second, `false` otherwise.
