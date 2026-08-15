# template (Lodash 兼容性)

::: warning 使用 JavaScript 模板字面量

由于复杂的字符串处理,这个 `template` 函数运行较慢。

请使用更快、更现代的 JavaScript 模板字面量。

:::

创建一个函数,将值插入字符串模板以生成新字符串。

```typescript
const compiled = template(templateString);
```

## 用法

### `template(string, options?)`

当您想要将数据插入字符串模板以创建完整字符串时,请使用 `template`。您可以安全地转义值、按原样插入值或执行 JavaScript 代码。

基本用法允许您插入或转义值。

```typescript
import { template } from 'es-toolkit/compat';

// 按原样插入值
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' });
// 返回: 'Hello, World!'

// 安全转义 HTML
const safeCompiled = template('<%- value %>');
safeCompiled({ value: '<script>alert("xss")</script>' });
// 返回: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

您也可以执行 JavaScript 代码。

```typescript
import { template } from 'es-toolkit/compat';

// 使用条件语句
const compiled = template('<% if (user) { %>你好 <%= user %>!<% } %>');
compiled({ user: 'es-toolkit' });
// 返回: '你好 es-toolkit!'

// 使用循环
const listTemplate = template('<% users.forEach(function(user) { %><li><%= user %></li><% }); %>');
listTemplate({ users: ['小明', '小红', '小刚'] });
// 返回: '<li>小明</li><li>小红</li><li>小刚</li>'
```

您可以指定变量名以更安全地使用。

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= data.name %> 今年 <%= data.age %> 岁', {
  variable: 'data',
});
compiled({ name: '小明', age: 25 });
// 返回: '小明 今年 25 岁'
```

您可以导入和使用外部函数。

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= _.toUpper(message) %>', {
  imports: { _: { toUpper: str => str.toUpperCase() } },
});
compiled({ message: 'hello world' });
// 返回: 'HELLO WORLD'
```

您也可以创建自定义分隔符。

```typescript
import { template } from 'es-toolkit/compat';

// 使用自定义分隔符插入值
const compiled = template('{{ message }}', {
  interpolate: /\{\{([\s\S]+?)\}\}/g,
});
compiled({ message: '你好!' });
// 返回: '你好!'

// 使用自定义分隔符转义
const safeCompiled = template('[- html -]', {
  escape: /\[-([\s\S]+?)-\]/g,
});
safeCompiled({ html: '<div>内容</div>' });
// 返回: '&lt;div&gt;内容&lt;/div&gt;'
```

#### 参数

- `string` (`string`): 模板字符串。
- `options` (`object`, 可选): 配置对象。
  - `options.escape` (`RegExp`, 可选): 用于 HTML 转义的正则表达式分隔符。默认为 `<%-([\s\S]+?)%>`。
  - `options.evaluate` (`RegExp`, 可选): 用于执行 JavaScript 代码的正则表达式分隔符。默认为 `<%([\s\S]+?)%>`。
  - `options.interpolate` (`RegExp`, 可选): 用于值插入的正则表达式分隔符。默认为 `<%=([\s\S]+?)%>`。
  - `options.variable` (`string`, 可选): 数据对象的变量名。
  - `options.imports` (`object`, 可选): 模板中使用的函数。
  - `options.sourceURL` (`string`, 可选): 用于调试的源 URL。

#### 返回值

(`TemplateExecutor`): 一个接收数据对象并返回完整字符串的函数。生成的函数代码也可以通过 `source` 属性访问。
