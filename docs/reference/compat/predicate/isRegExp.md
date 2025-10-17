# isRegExp (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isRegExp](../../predicate/isRegExp.md) instead

This `isRegExp` function is a Lodash compatibility function, but is a simple type check.

Use the faster and more modern `es-toolkit`'s [isRegExp](../../predicate/isRegExp.md) instead.

:::

Checks if a value is a regular expression.

```typescript
const result = isRegExp(value);
```

## Reference

### `isRegExp(value)`

Use `isRegExp` when you want to type-safely check if a value is a regular expression. It also works as a type guard in TypeScript.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// Regular expressions
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
isRegExp(/[a-z]+/g); // true
isRegExp(/pattern/gi); // true

// Other types return false
isRegExp('/abc/'); // false (string)
isRegExp('pattern'); // false (string)
isRegExp({}); // false (object)
isRegExp([]); // false (array)
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(123); // false (number)
```

It distinguishes between regex strings and actual regex objects.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// Regular expression vs regex string
isRegExp(/test/); // true
isRegExp('/test/'); // false
isRegExp('\\d+'); // false
isRegExp('/\\d+/g'); // false

// Various regex flags
isRegExp(/test/i); // true (case insensitive)
isRegExp(/test/g); // true (global search)
isRegExp(/test/m); // true (multiline)
isRegExp(/test/gim); // true (all flags combined)
```

It also recognizes dynamically created regular expressions.

```typescript
import { isRegExp } from 'es-toolkit/compat';

// Regex created with RegExp constructor
const dynamicRegex = new RegExp('\\d{3}-\\d{4}', 'g');
isRegExp(dynamicRegex); // true

// Regex created through strings
const pattern = 'hello';
const flags = 'gi';
const regex = new RegExp(pattern, flags);
isRegExp(regex); // true
```

#### Parameters

- `value` (`any`): The value to check if it's a regular expression.

#### Returns

(`value is RegExp`): Returns `true` if the value is a regular expression, `false` otherwise.
