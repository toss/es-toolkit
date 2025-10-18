# split (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.split`

This `split` function operates slowly due to handling `null` or `undefined`.

Instead, use the faster and more modern JavaScript's `String.prototype.split`.

:::

Splits a string into an array using a separator.

```typescript
const segments = split(str, separator);
```

## Reference

### `split(string, separator?, limit?)`

Use `split` when you want to divide a string into an array using a specific separator. You can also limit the maximum length of the resulting array.

```typescript
import { split } from 'es-toolkit/compat';

// Split by hyphen
split('a-b-c', '-');
// Returns: ['a', 'b', 'c']

// Limit the number of results
split('a-b-c-d', '-', 2);
// Returns: ['a', 'b']

// Split by regular expression
split('hello world', /\s/);
// Returns: ['hello', 'world']
```

If no separator is specified, the entire string becomes the first element of the array.

```typescript
import { split } from 'es-toolkit/compat';

split('hello');
// Returns: ['hello']
```

`null` or `undefined` are treated as empty strings.

```typescript
import { split } from 'es-toolkit/compat';

split(null);
// Returns: ['']

split(undefined);
// Returns: ['']
```

#### Parameters

- `string` (`string`, optional): The string to split. Defaults to an empty string.
- `separator` (`RegExp | string`, optional): The separator to use for splitting.
- `limit` (`number`, optional): The maximum length of the resulting array.

#### Returns

(`string[]`): Returns an array of strings split by the separator.
