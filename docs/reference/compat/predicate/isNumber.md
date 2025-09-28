# isNumber (Lodash compatibility)

::: warning Use `typeof` operator

This `isNumber` function is complex due to handling Number object wrappers.

Instead, use the simpler and modern `typeof value === 'number'`.

:::

Checks if a value is a number.

```typescript
const result = isNumber(value);
```

## Reference

### `isNumber(value)`

Use `isNumber` when you want to check if a value is a number. This function recognizes both primitive numbers and Number objects as numbers.

```typescript
import { isNumber } from 'es-toolkit/compat';

// Primitive numbers
isNumber(123);
// Returns: true

isNumber(3.14);
// Returns: true

isNumber(NaN);
// Returns: true

// Number objects
isNumber(new Number(42));
// Returns: true

// Other types
isNumber('123');
// Returns: false

isNumber(true);
// Returns: false

isNumber(null);
// Returns: false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a number.

#### Returns

(`value is number`): Returns `true` if the value is a number, otherwise `false`.