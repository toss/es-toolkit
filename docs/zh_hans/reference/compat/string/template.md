# template

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将模板字符串编译为一个可以插入数据属性的函数。

此函数允许您创建一个具有自定义定界符的模板，用于转义、评估和插入值。它还可以处理自定义变量名和导入的函数。

## 签名

```typescript
function template(string: string, options?: TemplateOptions): ((data?: object) => string) & { source: string };
```

### 参数

- `string` (`string`): 模板字符串。
- `options.escape` (`RegExp`): "escape" 定界符的正则表达式。
- `options.evaluate` (`RegExp`): "evaluate" 定界符的正则表达式。
- `options.interpolate` (`RegExp`): "interpolate" 定界符的正则表达式。
- `options.variable` (`string`): 数据对象的变量名。
- `options.imports` (`Record<string, unknown>`): 导入函数的对象。
- `options.sourceURL` (`string`): 模板的源 URL。
- `guard` (`unknown`): 检测函数是否使用 `options` 调用的保护。

### 返回值

(`(data?: object) => string`): 返回编译的模板函数。

## 示例

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
