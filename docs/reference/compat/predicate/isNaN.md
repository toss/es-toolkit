# isNaN (Lodash compatibility)

::: warning Use `Number.isNaN`

This `isNaN` function operates slowly due to additional function calls.

Instead, use the faster and modern `Number.isNaN`.

:::

Checks if a value is `NaN`.

```typescript
const result = isNaN(value);
```

## Reference

### `isNaN(value)`

Use `isNaN` when you want to check if a value is `NaN`.

```typescript
import { isNaN } from 'es-toolkit/compat';

// NaN checks
isNaN(NaN);
// Returns: true

isNaN(Number.NaN);
// Returns: true

// Other values
isNaN(undefined);
// Returns: false

isNaN(null);
// Returns: false

isNaN(0);
// Returns: false

isNaN('NaN');
// Returns: false
```

#### Parameters

- `value` (`unknown`): The value to check if it's NaN.

#### Returns

(`boolean`): Returns `true` if the value is NaN, otherwise `false`.