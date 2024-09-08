# escape

将 `str` 中的 "&", "<", ">", '"', "'", 和 "\`" 字符转换为 HTML 实体字符。例如，`"<"` 会被转换为 `"&lt;"`。

## 签名

```typescript
function escape(str: string): string;
```

### 参数

- `str` (`string`): 要转义的字符串。

### 返回值

(`string`): 转义后的字符串。

## 示例

```typescript
import { escape } from 'es-toolkit/string';

escape('This is a <div> element.'); // returns 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // returns 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // returns 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // returns 'This is a &amp; symbol'
```
