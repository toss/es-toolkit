# unescape (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `unescape`

由于需要处理 `null` 或 `undefined` 的转换逻辑,此 `unescape` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [unescape](../../string/unescape.md)。

:::

将 HTML 实体转换为原始字符。

```typescript
const unescaped = unescape(str);
```

## 参考

### `unescape(str)`

当您想要将 HTML 实体 `&amp;`、`&lt;`、`&gt;`、`&quot;`、`&#39;` 转换回原始字符时,请使用 `unescape`。这是 `escape` 函数的反向操作。

```typescript
import { unescape } from 'es-toolkit/compat';

// 反转义 HTML 标签
unescape('This is a &lt;div&gt; element.');
// 返回: 'This is a <div> element.'

// 反转义引号
unescape('This is a &quot;quote&quot;');
// 返回: 'This is a "quote"'

// 反转义撇号
unescape('This is a &#39;quote&#39;');
// 返回: 'This is a 'quote''

// 反转义 & 符号
unescape('This is a &amp; symbol');
// 返回: 'This is a & symbol'
```

`null` 或 `undefined` 被视为空字符串。

```typescript
import { unescape } from 'es-toolkit/compat';

unescape(null); // ''
unescape(undefined); // ''
```

#### 参数

- `str` (`string`, 可选): 要反转义的字符串。

#### 返回值

(`string`): 返回将 HTML 实体转换为原始字符后的字符串。
