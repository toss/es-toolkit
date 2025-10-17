# template (Lodash compatibility)

::: warning Use JavaScript template literals

This `template` function operates slowly due to complex string processing.

Use faster and more modern JavaScript template literals instead.

:::

Creates a function that interpolates values into a string template to generate a new string.

```typescript
const compiled = template(templateString);
```

## Reference

### `template(string, options?)`

Use `template` when you want to interpolate data into a string template to create a completed string. You can safely escape values, interpolate them as-is, or execute JavaScript code.

Basic usage allows you to interpolate or escape values.

```typescript
import { template } from 'es-toolkit/compat';

// Interpolate values as-is
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' });
// Returns: 'Hello, World!'

// Safely escape HTML
const safeCompiled = template('<%- value %>');
safeCompiled({ value: '<script>alert("xss")</script>' });
// Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

You can also execute JavaScript code.

```typescript
import { template } from 'es-toolkit/compat';

// Using conditional statements
const compiled = template('<% if (user) { %>Hello <%= user %>!<% } %>');
compiled({ user: 'es-toolkit' });
// Returns: 'Hello es-toolkit!'

// Using loops
const listTemplate = template('<% users.forEach(function(user) { %><li><%= user %></li><% }); %>');
listTemplate({ users: ['Alice', 'Bob', 'Charlie'] });
// Returns: '<li>Alice</li><li>Bob</li><li>Charlie</li>'
```

You can specify variable names for safer usage.

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= data.name %> is <%= data.age %> years old', {
  variable: 'data',
});
compiled({ name: 'Alice', age: 25 });
// Returns: 'Alice is 25 years old'
```

You can import and use external functions.

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= _.toUpper(message) %>', {
  imports: { _: { toUpper: str => str.toUpperCase() } },
});
compiled({ message: 'hello world' });
// Returns: 'HELLO WORLD'
```

You can also create custom delimiters.

```typescript
import { template } from 'es-toolkit/compat';

// Interpolate with custom delimiters
const compiled = template('{{ message }}', {
  interpolate: /\{\{([\s\S]+?)\}\}/g,
});
compiled({ message: 'Hello!' });
// Returns: 'Hello!'

// Escape with custom delimiters
const safeCompiled = template('[- html -]', {
  escape: /\[-([\s\S]+?)-\]/g,
});
safeCompiled({ html: '<div>content</div>' });
// Returns: '&lt;div&gt;content&lt;/div&gt;'
```

#### Parameters

- `string` (`string`): The template string.
- `options` (`object`, optional): Configuration object.
  - `options.escape` (`RegExp`, optional): Regular expression delimiter for HTML escaping. Default is `<%-([\s\S]+?)%>`.
  - `options.evaluate` (`RegExp`, optional): Regular expression delimiter for executing JavaScript code. Default is `<%([\s\S]+?)%>`.
  - `options.interpolate` (`RegExp`, optional): Regular expression delimiter for value interpolation. Default is `<%=([\s\S]+?)%>`.
  - `options.variable` (`string`, optional): Variable name for the data object.
  - `options.imports` (`object`, optional): Functions to be used in the template.
  - `options.sourceURL` (`string`, optional): Source URL for debugging purposes.

#### Returns

(`TemplateExecutor`): A function that takes a data object and returns the completed string. The generated function code can also be accessed via the `source` property.
