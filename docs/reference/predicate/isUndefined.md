# isUndefined

Checks if a given value is `undefined`.

```typescript
const result = isUndefined(value);
```

## Usage

### `isUndefined(value)`

Use `isUndefined` when you want to check if a value is `undefined`. It's useful for checking whether a variable is initialized or whether an optional property exists.

```typescript
import { isUndefined } from 'es-toolkit/predicate';

// undefined values
console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true

let uninitialized: string;
console.log(isUndefined(uninitialized)); // true

// Non-undefined values
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(0)); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's undefined.

#### Returns

(`value is undefined`): Returns `true` if the value is undefined, `false` otherwise.
