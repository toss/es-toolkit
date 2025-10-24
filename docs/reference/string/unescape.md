# unescape

Converts HTML entity characters to their original characters.

```typescript
const result = unescape(str);
```

## Reference

### `unescape(str)`

Use `unescape` when you want to convert HTML entity characters back to their original characters. It converts HTML entities like `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;` to `&`, `<`, `>`, `"`, `'` characters. This is the inverse operation of the [`escape`](./escape.md) function.

```typescript
import { unescape } from 'es-toolkit/string';

// Convert HTML tag entities to original characters
unescape('This is a &lt;div&gt; element.');
// Returns: 'This is a <div> element.'

// Convert quote entities to original characters
unescape('This is a &quot;quote&quot;');
// Returns: 'This is a "quote"'

// Convert single quote entities to original characters
unescape('This is a &#39;quote&#39;');
// Returns: 'This is a 'quote''

// Convert ampersand entities to original characters
unescape('This is a &amp; symbol');
// Returns: 'This is a & symbol'
```

Useful when processing data from HTML forms or URLs:

```typescript
// Convert HTML entities from user input
const userInput = 'My favorite tag is &lt;button&gt;';
const converted = unescape(userInput);
console.log(converted); // 'My favorite tag is <button>'

// Can also convert strings with mixed entities
const mixed = '&quot;Hello &amp; Welcome&quot; &lt;says the &gt; user';
const result = unescape(mixed);
console.log(result); // '"Hello & Welcome" <says the > user'
```

#### Parameters

- `str` (`string`): The string to convert.

#### Returns

(`string`): Returns a string with HTML entities converted to their original characters.
