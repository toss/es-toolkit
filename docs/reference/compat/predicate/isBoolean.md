# isBoolean (Lodash compatibility)

::: warning Use `typeof` operator

This `isBoolean` function is complex due to handling Boolean object wrappers.

Instead, use the simpler and modern `typeof value === 'boolean'`.

:::

Checks if a value is of boolean type.

```typescript
const result = isBoolean(value);
```

## Reference

### `isBoolean(value)`

Use `isBoolean` when you want to type-safely check if a value is of boolean type. It checks both primitive boolean values and Boolean object wrappers. It also works as a type guard in TypeScript.

```typescript
import { isBoolean } from 'es-toolkit/compat';

// Primitive boolean values
isBoolean(true); // true
isBoolean(false); // true

// Boolean object wrappers
isBoolean(new Boolean(true)); // true
isBoolean(new Boolean(false)); // true

// Other types return false
isBoolean(0); // false
isBoolean(1); // false
isBoolean('true'); // false
isBoolean('false'); // false
isBoolean(null); // false
isBoolean(undefined); // false
isBoolean({}); // false
isBoolean([]); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's of boolean type.

#### Returns

(`value is boolean`): Returns `true` if the value is of boolean type, otherwise `false`.