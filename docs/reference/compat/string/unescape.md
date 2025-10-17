# unescape (Lodash Compatibility)

::: warning Use `unescape` from `es-toolkit`

This `unescape` function operates slowly due to conversion logic for handling `null` or `undefined`.

Use the faster and more modern [unescape](../../string/unescape.md) from `es-toolkit` instead.

:::

Converts HTML entities to their original characters.

```typescript
const unescaped = unescape(str);
```

## Reference

### `unescape(str)`

Use `unescape` when you want to convert HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;` back to their original characters. This is the reverse operation of the `escape` function.

```typescript
import { unescape } from 'es-toolkit/compat';

// Unescape HTML tags
unescape('This is a &lt;div&gt; element.');
// Returns: 'This is a <div> element.'

// Unescape quotes
unescape('This is a &quot;quote&quot;');
// Returns: 'This is a "quote"'

// Unescape apostrophes
unescape('This is a &#39;quote&#39;');
// Returns: 'This is a 'quote''

// Unescape ampersands
unescape('This is a &amp; symbol');
// Returns: 'This is a & symbol'
```

`null` or `undefined` is treated as an empty string.

```typescript
import { unescape } from 'es-toolkit/compat';

unescape(null); // ''
unescape(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to unescape.

#### Returns

(`string`): Returns the string with HTML entities converted to their original characters.
