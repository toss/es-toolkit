# lte (Lodash Compatibility)

::: warning Use the `<=` operator instead

This `lte` function performs slower due to additional processing like `toNumber` function calls and string type checking.

Instead, use the faster and more modern `<=` operator.

:::

Checks if value is less than or equal to other.

```typescript
const result = lte(value, other);
```

## Usage

### `lte(value, other)`

Use `lte` when you want to compare two values to check if the first value is less than or equal to the second. Strings are compared lexicographically, and other types are converted to numbers for comparison.

```typescript
import { lte } from 'es-toolkit/compat';

lte(1, 3);
// Returns: true

lte(3, 3);
// Returns: true

lte(3, 1);
// Returns: false

// String comparison (lexicographical)
lte('abc', 'def');
// Returns: true

lte('def', 'abc');
// Returns: false

// Other types are converted to numbers for comparison
lte('10', 5);
// Returns: false (10 <= 5)

lte(null, 0);
// Returns: true (0 <= 0)
```

#### Parameters

- `value` (`unknown`): The first value to compare.
- `other` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the first value is less than or equal to the second, `false` otherwise.
