# unescape

将HTML实体字符转换为原始字符。

```typescript
const result = unescape(str);
```

## 用法

### `unescape(str)`

当您想将HTML实体字符转换回原始字符时,请使用 `unescape`。它将 `&amp;`、`&lt;`、`&gt;`、`&quot;`、`&#39;` 等HTML实体转换为 `&`、`<`、`>`、`"`、`'` 字符。这是 [`escape`](./escape.md) 函数的逆操作。

```typescript
import { unescape } from 'es-toolkit/string';

// 将HTML标签实体转换为原始字符
unescape('This is a &lt;div&gt; element.');
// 返回值: 'This is a <div> element.'

// 将引号实体转换为原始字符
unescape('This is a &quot;quote&quot;');
// 返回值: 'This is a "quote"'

// 将单引号实体转换为原始字符
unescape('This is a &#39;quote&#39;');
// 返回值: 'This is a 'quote''

// 将&符号实体转换为原始字符
unescape('This is a &amp; symbol');
// 返回值: 'This is a & symbol'
```

处理来自HTML表单或URL的数据时很有用:

```typescript
// 转换用户输入中的HTML实体
const userInput = 'My favorite tag is &lt;button&gt;';
const converted = unescape(userInput);
console.log(converted); // 'My favorite tag is <button>'

// 也可以转换混合多个实体的字符串
const mixed = '&quot;Hello &amp; Welcome&quot; &lt;says the &gt; user';
const result = unescape(mixed);
console.log(result); // '"Hello & Welcome" <says the > user'
```

#### 参数

- `str` (`string`): 要转换的字符串。

#### 返回值

(`string`): 返回HTML实体已转换为原始字符的字符串。
