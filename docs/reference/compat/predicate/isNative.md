# isNative (Lodash Compatibility)

Checks if a value is a native function of the JavaScript engine.

```typescript
const result = isNative(value);
```

## Reference

### `isNative(value)`

Use `isNative` when you need to check if a given value is a native function implemented in the JavaScript engine. You can distinguish built-in functions provided by browsers or Node.js.

```typescript
import { isNative } from 'es-toolkit/compat';

// Native functions
isNative(Array.prototype.push); // true
isNative(Object.keys); // true
isNative(Math.max); // true
isNative(JSON.parse); // true
isNative(console.log); // true (in browser/Node.js environment)

// User-defined functions
isNative(function () {}); // false
isNative(() => {}); // false
isNative(function customFunction() {}); // false

// Library functions
isNative(require('lodash').map); // false
isNative(require('es-toolkit').chunk); // false

// Non-function values
isNative({}); // false
isNative([]); // false
isNative('function'); // false
isNative(123); // false
isNative(null); // false

// Bound functions
const boundFunction = Array.prototype.push.bind([]);
isNative(boundFunction); // true (bound functions are native)

// Methods
const obj = { method: Array.prototype.push };
isNative(obj.method); // true (still a native function)
```

#### Parameters

- `value` (`any`): The value to check.

#### Returns

(`boolean`): Returns `true` if the value appears to be a native function, otherwise `false`.
