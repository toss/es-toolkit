# isString (Lodash Compatibility)

::: warning Use `typeof` operator instead

This `isString` function is complex due to String object wrapper handling.

Use the simpler and more modern `typeof value === 'string'` instead.

:::

Checks if a value is a string.

```typescript
const result = isString(value);
```

## Reference

### `isString(value)`

Use `isString` when you want to type-safely check if a value is a string. It checks both primitive strings and String object wrappers. It also works as a type guard in TypeScript.

```typescript
import { isString } from 'es-toolkit/compat';

// Primitive strings
isString('hello'); // true
isString(''); // true
isString('123'); // true

// String object wrappers
isString(new String('hello')); // true
isString(new String('')); // true

// Other types return false
isString(123); // false
isString(true); // false
isString(null); // false
isString(undefined); // false
isString({}); // false
isString([]); // false
isString(Symbol('test')); // false
```

It distinguishes from other types that may look like strings.

```typescript
import { isString } from 'es-toolkit/compat';

// String vs number
isString('123'); // true
isString(123); // false

// String vs boolean
isString('true'); // true
isString(true); // false

// String vs null/undefined
isString('null'); // true
isString(null); // false
isString('undefined'); // true
isString(undefined); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a string.

#### Returns

(`value is string`): Returns `true` if the value is a string, `false` otherwise.
