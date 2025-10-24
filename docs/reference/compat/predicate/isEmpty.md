# isEmpty (Lodash Compatibility)

Checks if a given value is empty.

```typescript
const result = isEmpty(value);
```

## Reference

### `isEmpty(value)`

Use `isEmpty` when you want to check if various types of values are empty. It can handle strings, arrays, objects, Maps, Sets, and more.

```typescript
import { isEmpty } from 'es-toolkit/compat';

// String checks
isEmpty(''); // true
isEmpty('hello'); // false

// Array checks
isEmpty([]); // true
isEmpty([1, 2, 3]); // false

// Object checks
isEmpty({}); // true
isEmpty({ a: 1 }); // false

// Map and Set checks
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false

// null and undefined
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(); // true

// Array-like objects
isEmpty({ 0: 'a', length: 1 }); // false
isEmpty({ length: 0 }); // false
```

All primitive values are treated as empty:

```typescript
import { isEmpty } from 'es-toolkit/compat';

isEmpty(0); // true
isEmpty(false); // true
isEmpty(123); // true
isEmpty('text'); // false (strings are judged by length)
```

#### Parameters

- `value` (`unknown`, optional): The value to check.

#### Returns

(`boolean`): Returns `true` if the value is empty, otherwise `false`.
