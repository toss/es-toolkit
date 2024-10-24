# template

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Compiles a template string into a function that can interpolate data properties.

This function allows you to create a template with custom delimiters for escaping,
evaluating, and interpolating values. It can also handle custom variable names and
imported functions.

## Signature

```typescript
function template(string: string, options?: TemplateOptions): ((data?: object) => string) & { source: string };
```

### Parameters

- `string` (`string`): The template string.
- `options.escape` (`RegExp`): The regular expression for "escape" delimiter.
- `options.evaluate` (`RegExp`): The regular expression for "evaluate" delimiter.
- `options.interpolate` (`RegExp`): The regular expression for "interpolate" delimiter.
- `options.variable` (`string`): The data object variable name.
- `options.imports` (`Record<string, unknown>`): The object of imported functions.
- `options.sourceURL` (`string`): The source URL of the template.

### Returns

(`(data?: object) => string`): Returns the compiled template function.

## Examples

```typescript
// Use the "escape" delimiter to escape data properties.
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the "interpolate" delimiter to interpolate data properties.
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "evaluate" delimiter to evaluate JavaScript code.
const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
compiled({ value: true }); // returns 'Yes'

// Use the "variable" option to specify the data object variable name.
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "imports" option to import functions.
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // returns 'HELLO, WORLD!'

// Use the custom "escape" delimiter.
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the custom "evaluate" delimiter.
const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // returns 'Yes'

// Use the custom "interpolate" delimiter.
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "sourceURL" option to specify the source URL of the template.
const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
```
