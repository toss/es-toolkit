# replace (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.replace`

This `replace` function operates slower due to handling non-string values.

Instead, use the faster and more modern JavaScript's `String.prototype.replace`.

:::

Replaces matching patterns in a string with another string.

```typescript
const replaced = replace(target, pattern, replacement);
```

## Usage

### `replace(target, pattern, replacement)`

Use `replace` when you want to find a specific pattern in a string and replace it with another string. You can use a string or regular expression pattern, and the replacement can be specified as a string or function.

```typescript
import { replace } from 'es-toolkit/compat';

// Replace with string pattern
replace('abcde', 'de', '123');
// Returns: 'abc123'

// Replace with regular expression pattern
replace('abcde', /[bd]/g, '-');
// Returns: 'a-c-e'
```

You can also use a function to dynamically decide the replacement.

```typescript
import { replace } from 'es-toolkit/compat';

// Decide replacement content with function
replace('abcde', 'de', match => match.toUpperCase());
// Returns: 'abcDE'

// Combination of regular expression and function
replace('abcde', /[bd]/g, match => match.toUpperCase());
// Returns: 'aBcDe'
```

`null` or `undefined` targets are treated as empty strings.

```typescript
import { replace } from 'es-toolkit/compat';

replace(null, 'test', 'replaced');
// Returns: ''

replace(undefined, /test/g, 'replaced');
// Returns: ''
```

#### Parameters

- `target` (`string`): The target string to replace.
- `pattern` (`string | RegExp`): The pattern to find.
- `replacement` (`string | Function`): The replacement content. If a function, it receives the matched string and should return the replacement string.

#### Returns

(`string`): Returns a new string with the pattern replaced.
