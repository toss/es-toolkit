# isFinite (Lodash Compatibility)

::: warning Use `Number.isFinite`

This `isFinite` function operates slowly due to additional type checking overhead.

Instead, use the faster and modern `Number.isFinite`.

:::

Checks if a value is a finite number.

```typescript
const result = isFinite(value);
```

## Usage

### `isFinite(value)`

Use `isFinite` when you need to check if a given value is a finite number. This function also works as a type guard in TypeScript, narrowing the type of the value to `number`.

```typescript
import { isFinite } from 'es-toolkit/compat';

// Finite numbers
isFinite(100); // true
isFinite(-50); // true
isFinite(3.14); // true
isFinite(0); // true

// Infinity is false
isFinite(Infinity); // false
isFinite(-Infinity); // false

// NaN is also false
isFinite(NaN); // false

// Other types are also false
isFinite('100'); // false
isFinite([]); // false
isFinite({}); // false
isFinite(null); // false
isFinite(undefined); // false
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is a finite number, otherwise `false`.
