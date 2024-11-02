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
// 使用 "escape" 定界符来转义数据属性。
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // 返回 '&lt;div&gt;'

// 使用 "interpolate" 定界符来插入数据属性。
const compiled = template('<%= value %>');
compiled({ value: '你好，世界！' }); // 返回 '你好，世界！'

// 使用 "evaluate" 定界符来评估 JavaScript 代码。
const compiled = template('<% if (value) { %>是<% } else { %>否<% } %>');
compiled({ value: true }); // 返回 '是'

// 使用 "variable" 选项来指定数据对象的变量名。
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: '你好，世界！' }); // 返回 '你好，世界！'

// 使用 "imports" 选项来导入函数。
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // 返回 'HELLO, WORLD!'

// 使用自定义 "escape" 定界符。
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // 返回 '&lt;div&gt;'

// 使用自定义 "evaluate" 定界符。
const compiled = template('<# if (value) { #>是<# } else { #>否<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // 返回 '是'

// 使用自定义 "interpolate" 定界符。
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: '你好，世界！' }); // 返回 '你好，世界！'

// 使用 "sourceURL" 选项来指定模板的源 URL。
const compiled = template('你好 <%= user %>!', { sourceURL: 'template.js' });
```
