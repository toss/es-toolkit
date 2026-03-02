# toLower (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.toLowerCase`

This `toLower` function operates slowly due to handling non-string values.

Use JavaScript's `String.prototype.toLowerCase` instead, which is faster and more modern.

:::

Converts a value to a string and then transforms it to lowercase.

```typescript
const lowercased = toLower(value);
```

## Usage

### `toLower(value?)`

Use `toLower` when you want to convert a value to a lowercase string. It first converts any type of value to a string and then transforms it to lowercase.

```typescript
import { toLower } from 'es-toolkit/compat';

// Convert string to lowercase
toLower('--FOO-BAR--');
// Returns: '--foo-bar--'

toLower('Hello World');
// Returns: 'hello world'

// Convert number
toLower(123);
// Returns: '123'

// Convert array
toLower([1, 2, 3]);
// Returns: '1,2,3'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { toLower } from 'es-toolkit/compat';

toLower(null);
// Returns: ''

toLower(undefined);
// Returns: ''

toLower();
// Returns: ''
```

#### Parameters

- `value` (`unknown`, optional): The value to convert to lowercase.

#### Returns

(`string`): Returns the lowercased string.
