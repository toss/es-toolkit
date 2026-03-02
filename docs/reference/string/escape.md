# escape

Converts characters with special meaning in HTML to safe entities.

```typescript
const result = escape(str);
```

## Usage

### `escape(str)`

Use `escape` when you want to safely insert text into HTML. It converts special characters like `&`, `<`, `>`, `"`, and `'` to HTML entities to prevent XSS attacks and ensure HTML is displayed correctly.

```typescript
import { escape } from 'es-toolkit/string';

// Handle basic HTML special characters
escape('<div>Hello World</div>'); // returns '&lt;div&gt;Hello World&lt;/div&gt;'
escape('Tom & Jerry'); // returns 'Tom &amp; Jerry'
escape('"Hello"'); // returns '&quot;Hello&quot;'
escape("'Hello'"); // returns '&#39;Hello&#39;'
```

It's essential for security when displaying user input in HTML.

```typescript
import { escape } from 'es-toolkit/string';

// Handle user input
const userInput = '<script>alert("XSS")</script>';
const safeHtml = `<div>${escape(userInput)}</div>`;
// returns '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>'

// Generate dynamic HTML
const title = 'Article "How to & Why"';
const html = `<h1>${escape(title)}</h1>`;
// returns '<h1>Article &quot;How to &amp; Why&quot;</h1>'
```

You can use it in templates or comment systems.

```typescript
import { escape } from 'es-toolkit/string';

// Comment system
function renderComment(comment: string, author: string) {
  return `
    <div class="comment">
      <strong>${escape(author)}</strong>: ${escape(comment)}
    </div>
  `;
}

// Usage example
const html = renderComment('I love <coding> & "programming"!', 'John Doe');
// returns '<div class="comment"><strong>John Doe</strong>: I love &lt;coding&gt; &amp; &quot;programming&quot;!</div>'
```

It's also useful when putting JSON strings in HTML attributes.

```typescript
import { escape } from 'es-toolkit/string';

const data = { message: 'Hello & "welcome"' };
const jsonString = JSON.stringify(data);
const htmlAttribute = `<div data-info="${escape(jsonString)}"></div>`;
// returns '<div data-info="{&quot;message&quot;:&quot;Hello &amp; \\&quot;welcome\\&quot;&quot;}"></div>'
```

#### Parameters

- `str` (`string`): The string to convert for safe use in HTML.

#### Returns

(`string`): Returns a new string with characters converted to HTML entities.
