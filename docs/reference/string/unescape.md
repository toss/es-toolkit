# unescape

Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `str` to their corresponding characters. It is the inverse of [`escape`](./escape.md). 

## Signature

```typescript
function unescape(str: string): string;
```

### Parameters

- `str` (`string`): The string to unescape.

### Returns

(`string`): The unescaped string.

## Examples

```typescript
import { unescape } from 'es-toolkit/string';

unescape('This is a &lt;div&gt; element.'); // returns 'This is a <div> element.'
unescape('This is a &quot;quote&quot;'); // returns 'This is a "quote"'
unescape('This is a &#39;quote&#39;'); // returns 'This is a 'quote''
unescape('This is a &amp; symbol'); // returns 'This is a & symbol'
```
