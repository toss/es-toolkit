# isDate (Lodash compatibility)

::: warning Use es-toolkit's [isDate](../../predicate/isDate.md) instead
This `isDate` function operates slowly due to complex processing for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isDate](../../predicate/isDate.md) instead.
:::

Checks if a value is a Date object.

```typescript
const result = isDate(value);
```

## Reference

### `isDate(value)`

Use `isDate` when you want to type-safely check if a value is a Date object. It also works as a type guard in TypeScript.

```typescript
import { isDate } from 'es-toolkit/compat';

// Check Date object
const date = new Date();
isDate(date); // true

// Invalid Date is also recognized as a Date object
const invalidDate = new Date('invalid');
isDate(invalidDate); // true

// Other types return false
isDate('2024-01-01'); // false
isDate(1640995200000); // false
isDate({}); // false
isDate(null); // false
isDate(undefined); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Date object.

#### Returns

(`value is Date`): Returns `true` if the value is a Date object, `false` otherwise.
