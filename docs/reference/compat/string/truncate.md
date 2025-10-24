# truncate (Lodash Compatibility)

::: warning Use JavaScript's `String.prototype.slice`

This `truncate` function operates slowly due to complex Unicode handling and regex checking.

Use the faster and more modern JavaScript's `String.prototype.slice` instead.

:::

Truncates a string if it's longer than the specified maximum length and appends an omission string.

```typescript
const truncated = truncate(str, options);
```

## Reference

### `truncate(string, options?)`

Use `truncate` when you want to cut a long string to a specified length. The truncated part is replaced with an omission string (default: `"..."`).

```typescript
import { truncate } from 'es-toolkit/compat';

// Basic usage (max 30 characters)
truncate('hi-diddly-ho there, neighborino');
// Returns: 'hi-diddly-ho there, neighbo...'

// Specify length
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// Returns: 'hi-diddly-ho there, n...'

// Change omission string
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// Returns: 'hi-diddly-ho there, neig [...]'
```

You can specify a separator to truncate at that position.

```typescript
import { truncate } from 'es-toolkit/compat';

// Truncate at word boundaries with space separator
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// Returns: 'hi-diddly-ho there,...'

// Specify separator with regex
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: /,? +/,
});
// Returns: 'hi-diddly-ho there...'
```

Unicode characters are also handled correctly.

```typescript
import { truncate } from 'es-toolkit/compat';

truncate('¥§✈✉🤓', { length: 5 });
// Returns: '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// Returns: '¥§✈…'
```

#### Parameters

- `string` (`string`, optional): The string to truncate.
- `options` (`object`, optional): The options object.
  - `options.length` (`number`, optional): The maximum string length. Defaults to `30`.
  - `options.omission` (`string`, optional): The string to indicate text is omitted. Defaults to `'...'`.
  - `options.separator` (`RegExp | string`, optional): The separator pattern to truncate to.

#### Returns

(`string`): Returns the truncated string.
