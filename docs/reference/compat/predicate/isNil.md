# isNil (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isNil](../../predicate/isNil.md) instead

This `isNil` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isNil](../../predicate/isNil.md) instead.

:::

Checks if a value is `null` or `undefined`.

```typescript
const result = isNil(value);
```

## Reference

### `isNil(x)`

Use `isNil` when you want to type-safely check if a value is `null` or `undefined`. It also works as a type guard in TypeScript.

```typescript
import { isNil } from 'es-toolkit/compat';

// null and undefined return true
isNil(null); // true
isNil(undefined); // true

// All other values return false
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil([]); // false
isNil({}); // false
isNil('hello'); // false
isNil(42); // false
```

It distinguishes from values that are truthy but not `null` or `undefined`.

```typescript
import { isNil } from 'es-toolkit/compat';

// Values that are falsy but not null/undefined
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil(NaN); // false

// Only null and undefined return true
isNil(null); // true
isNil(undefined); // true
```

#### Parameters

- `x` (`any`): The value to check if it's `null` or `undefined`.

#### Returns

(`x is null | undefined`): Returns `true` if the value is `null` or `undefined`, `false` otherwise.
