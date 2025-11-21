# toUpper (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.toUpperCase`

This `toUpper` function performs slower due to handling non-string values.

Instead, use the faster and more modern JavaScript's `String.prototype.toUpperCase`.

:::

Converts a value to a string and then to uppercase.

```typescript
const uppercased = toUpper(value);
```

## Usage

### `toUpper(value?)`

Use `toUpper` when you want to convert a value to an uppercase string. It first converts any type of value to a string, then converts it to uppercase.

```typescript
import { toUpper } from 'es-toolkit/compat';

// Convert string to uppercase
toUpper('--foo-bar--');
// Returns: '--FOO-BAR--'

toUpper('Hello World');
// Returns: 'HELLO WORLD'

// Convert number
toUpper(123);
// Returns: '123'

// Convert array
toUpper([1, 2, 3]);
// Returns: '1,2,3'
```

`null` and `undefined` are treated as empty strings.

```typescript
import { toUpper } from 'es-toolkit/compat';

toUpper(null);
// Returns: ''

toUpper(undefined);
// Returns: ''

toUpper();
// Returns: ''
```

#### Parameters

- `value` (`unknown`, optional): The value to convert to uppercase.

#### Returns

(`string`): Returns the uppercase string.
