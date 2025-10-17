# isArrayBuffer (Lodash Compatibility)

::: warning Use es-toolkit's [isArrayBuffer](../../predicate/isArrayBuffer.md)

This `isArrayBuffer` function operates slowly due to complex handling for Lodash compatibility.

Instead, use the faster and modern [isArrayBuffer](../../predicate/isArrayBuffer.md) from `es-toolkit`.

:::

Checks if a value is an ArrayBuffer.

```typescript
const result = isArrayBuffer(value);
```

## Reference

### `isArrayBuffer(value)`

Use `isArrayBuffer` when you want to type-safely check if a value is an ArrayBuffer. It also works as a type guard in TypeScript.

```typescript
import { isArrayBuffer } from 'es-toolkit/compat';

// ArrayBuffer check
const buffer = new ArrayBuffer(16);
isArrayBuffer(buffer); // true

// Other types return false
isArrayBuffer(new Array()); // false
isArrayBuffer(new Map()); // false
isArrayBuffer({}); // false
isArrayBuffer('hello'); // false
isArrayBuffer(123); // false
isArrayBuffer(null); // false
isArrayBuffer(undefined); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's an ArrayBuffer.

#### Returns

(`value is ArrayBuffer`): Returns `true` if the value is an ArrayBuffer, otherwise `false`.
