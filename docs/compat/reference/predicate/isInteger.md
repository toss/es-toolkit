# isInteger (Lodash Compatibility)

::: warning Use `Number.isInteger`

This `isInteger` function operates slowly due to additional type checking overhead.

Instead, use the faster and modern `Number.isInteger`.

:::

Checks if a value is an integer.

```typescript
const result = isInteger(value);
```

## Usage

### `isInteger(value)`

Use `isInteger` when you need to check if a given value is an integer. This function also works as a type guard in TypeScript, narrowing the type of the value to `number`.

```typescript
import { isInteger } from 'es-toolkit/compat';

// Integer value checks
isInteger(3); // true
isInteger(-5); // true
isInteger(0); // true

// Decimal values are false
isInteger(3.14); // false
isInteger(-2.5); // false

// Infinity is false
isInteger(Infinity); // false
isInteger(-Infinity); // false

// Other types are also false
isInteger('3'); // false
isInteger([]); // false
isInteger({}); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is an integer, otherwise `false`.
