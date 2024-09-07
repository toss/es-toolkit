# escape

Converts the characters "&", "<", ">", '"', and "'" in `str` to their corresponding HTML entities. For example, `"<"` becomes `"&lt;"`.

## Signature

```typescript
function escape(str: string): string;
```

### Parameters

- `str` (`string`): The string to escape.

### Returns

(`string`): The escaped string.

## Examples

```typescript
import { escape } from 'es-toolkit/string';

escape('This is a <div> element.'); // returns 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // returns 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // returns 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // returns 'This is a &amp; symbol'
```
