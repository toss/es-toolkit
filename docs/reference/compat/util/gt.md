# gt (Lodash Compatibility)

::: warning Use the `>` operator instead

This `gt` function performs slower due to additional processing like `toNumber` function calls and string type checking.

Instead, use the faster and more modern `>` operator.

:::

Checks if value is greater than other.

```typescript
const result = gt(value, other);
```

## Reference

### `gt(value, other)`

Use `gt` when you want to compare two values to check if the first value is greater than the second. Strings are compared lexicographically, and other types are converted to numbers for comparison.

```typescript
import { gt } from 'es-toolkit/compat';

gt(3, 1);
// Returns: true

gt(3, 3);
// Returns: false

gt(1, 3);
// Returns: false

// String comparison (lexicographical)
gt('def', 'abc');
// Returns: true

gt('abc', 'def');
// Returns: false

// Other types are converted to numbers for comparison
gt('10', 5);
// Returns: true (10 > 5)

gt(1, null);
// Returns: true (1 > 0)
```

#### Parameters

- `value` (`unknown`): The first value to compare.
- `other` (`unknown`): The second value to compare.

#### Returns

(`boolean`): Returns `true` if the first value is greater than the second, `false` otherwise.
