# isBuffer (Lodash compatibility)

::: warning Use es-toolkit's [isBuffer](../../predicate/isBuffer.md) instead
This `isBuffer` function operates slowly due to complex processing for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isBuffer](../../predicate/isBuffer.md) instead.
:::

Checks if a value is a Buffer instance.

```typescript
const result = isBuffer(value);
```

## Reference

### `isBuffer(value)`

Use `isBuffer` when you want to type-safely check if a value is a Buffer instance. It's useful when working with Buffer objects in Node.js environments. It also works as a type guard in TypeScript.

```typescript
import { isBuffer } from 'es-toolkit/compat';

// Check Buffer instance
const buffer = Buffer.from('hello');
isBuffer(buffer); // true

// Other types return false
isBuffer('hello'); // false
isBuffer([1, 2, 3]); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer({}); // false
isBuffer(null); // false
isBuffer(undefined); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Buffer instance.

#### Returns

(`boolean`): Returns `true` if the value is a Buffer instance, `false` otherwise.
