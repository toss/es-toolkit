# isNull (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isNull](../../predicate/isNull.md) instead

This `isNull` function is a Lodash compatibility function, but has the same implementation as the main library.

Use the faster and more modern `es-toolkit`'s [isNull](../../predicate/isNull.md) instead.

:::

Checks if a value is `null`.

```typescript
const result = isNull(value);
```

## Usage

### `isNull(value)`

Use `isNull` when you want to type-safely check if a value is exactly `null`. It also works as a type guard in TypeScript.

```typescript
import { isNull } from 'es-toolkit/compat';

// Only null returns true
isNull(null); // true

// undefined also returns false
isNull(undefined); // false

// All other values also return false
isNull(0); // false
isNull(''); // false
isNull(false); // false
isNull([]); // false
isNull({}); // false
isNull('null'); // false
isNull(NaN); // false
```

You can distinguish between `null` and `undefined`.

```typescript
import { isNull } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isNull(value)) {
    console.log('Value is explicitly null');
  } else if (value === undefined) {
    console.log('Value is undefined');
  } else {
    console.log(`Value exists: ${value}`);
  }
}

handleValue(null); // "Value is explicitly null"
handleValue(undefined); // "Value is undefined"
handleValue('hello'); // "Value exists: hello"
```

#### Parameters

- `value` (`any`): The value to check if it's `null`.

#### Returns

(`boolean`): Returns `true` if the value is `null`, `false` otherwise.
