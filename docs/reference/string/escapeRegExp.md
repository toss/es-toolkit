# escapeRegExp

Escapes characters with special meaning in regular expressions to literal characters.

```typescript
const result = escapeRegExp(str);
```

## Usage

### `escapeRegExp(str)`

Use `escapeRegExp` when you want to safely use a string in a regular expression pattern. It escapes regex special characters like `^`, `$`, `\`, `.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, and `|` so they match literally.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// Basic usage
escapeRegExp('Hello.'); // returns 'Hello\\.'
escapeRegExp('(test)'); // returns '\\(test\\)'
escapeRegExp('user@domain.com'); // returns 'user@domain\\.com'
escapeRegExp('[abc]'); // returns '\\[abc\\]'
```

It's essential when using user input as a regex pattern.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// Use user search term as regex
function searchInText(text: string, searchTerm: string): boolean {
  const escapedTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(escapedTerm, 'i'); // case insensitive
  return regex.test(text);
}

searchInText('Visit https://example.com', 'https://example.com'); // returns true
searchInText('Price: $19.99', '$19.99'); // returns true
```

You can also use it for string replacement.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

function replaceAll(text: string, search: string, replacement: string): string {
  const escapedSearch = escapeRegExp(search);
  const regex = new RegExp(escapedSearch, 'g');
  return text.replace(regex, replacement);
}

const html = '<div>Hello</div> <span>World</span>';
const result = replaceAll(html, '<div>', '<section>');
// returns '<section>Hello</div> <span>World</span>'
```

It's useful for handling file paths or URLs.

```typescript
import { escapeRegExp } from 'es-toolkit/string';

// Check file extension
function hasExtension(filename: string, extension: string): boolean {
  const escapedExt = escapeRegExp(extension);
  const regex = new RegExp(`\\.${escapedExt}$`, 'i');
  return regex.test(filename);
}

hasExtension('document.pdf', 'pdf'); // returns true
hasExtension('image.jpg', 'pdf'); // returns false

// URL matching
function matchesUrl(text: string, url: string): boolean {
  const escapedUrl = escapeRegExp(url);
  const regex = new RegExp(escapedUrl);
  return regex.test(text);
}

const content = 'Visit our site at https://es-toolkit.dev/ for more info';
matchesUrl(content, 'https://es-toolkit.dev/'); // returns true
```

#### Parameters

- `str` (`string`): The string to escape regex special characters.

#### Returns

(`string`): Returns a new string with regex special characters escaped.
