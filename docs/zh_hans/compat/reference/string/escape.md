# escape (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `escape`

由于处理非字符串输入值,此 `escape` 函数运行较慢。

请改用更快、更现代的 `es-toolkit` 的 [escape](../../string/escape.md)。

:::

将字符串中的HTML特殊字符转换为HTML实体。

```typescript
const result = escape(str);
```

## 用法

### `escape(str)`

将字符串中的 `&`、`<`、`>`、`"`、`'` 字符转换为相应的HTML实体。这对于在HTML文档中安全插入文本以防止XSS攻击很有用。

```typescript
import { escape } from 'es-toolkit/compat';

escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // 'This is a &amp; symbol'
```

非字符串值也会在处理前转换为字符串。

```typescript
import { escape } from 'es-toolkit/compat';

escape(123); // '123'
escape(null); // ''
escape(undefined); // ''
```

#### 参数

- `str` (`string`,可选): 要转义HTML特殊字符的字符串。

#### 返回值

(`string`): 返回HTML特殊字符转换为实体的字符串。
