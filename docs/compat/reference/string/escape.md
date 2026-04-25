# escape (Lodash compatibility)

::: warning Use `escape` from `es-toolkit`

This `escape` function operates slower due to handling non-string input values.

Instead, use the faster and more modern [escape](../../string/escape.md) from `es-toolkit`.

:::

Converts HTML special characters in a string to HTML entities.

```typescript
const result = escape(str);
```

## Usage

### `escape(str)`

Converts the characters `&`, `<`, `>`, `"`, `'` in a string to their corresponding HTML entities. This is useful for preventing XSS attacks when inserting text into HTML documents.

```typescript
import { escape } from 'es-toolkit/compat';

escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // 'This is a &amp; symbol'
```

Non-string values are also converted to strings before processing.

```typescript
import { escape } from 'es-toolkit/compat';

escape(123); // '123'
escape(null); // ''
escape(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to escape HTML special characters.

#### Returns

(`string`): Returns the string with HTML special characters converted to entities.
