# gte (Lodash Compatibility)

::: warning Use the `>=` operator instead

This `gte` function performs slower due to additional processing like `toNumber` function calls and string type checking.

Instead, use the faster and more modern `>=` operator.

:::

Checks if value is greater than or equal to other.

```typescript
const result = gte(value, other);
```

## Usage

### `gte(value, other)`

Use `gte` when you want to compare two values to check if the first value is greater than or equal to the second. Strings are compared lexicographically, and other types are converted to numbers for comparison.

```typescript
import { gte } from 'es-toolkit/compat';

gte(3, 1);
// Returns: true

gte(3, 3);
// Returns: true

gte(1, 3);
// Returns: false

// String comparison (lexicographical)
gte('def', 'abc');
// Returns: true

gte('abc', 'def');
// Returns: false

// Other types are converted to numbers for comparison
gte('10', 5);
// Returns: true (10 >= 5)

gte(1, null);
// Returns: true (1 >= 0)
```

#### Parameters

- `value` (`unknown`): The first value to compare.
- `other` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the first value is greater than or equal to the second, `false` otherwise.
