# unescape

[`escape`](./escape.md) 的反向操作；该方法将 `str` 中的 HTML 实体字符 `&amp;`, `&lt;`, `&gt;`, `&quot;`, 和 `&#39;` 转换为对应的字符。

## 签名

```typescript
function unescape(str: string): string;
```

### 参数

- `str` (`string`): 要反转义的字符串。

### 返回值

(`string`): 反转义后的字符串。

## 示例

```typescript
import { unescape } from 'es-toolkit/string';

unescape('This is a &lt;div&gt; element.'); // returns 'This is a <div> element.'
unescape('This is a &quot;quote&quot;'); // returns 'This is a "quote"'
unescape('This is a &#39;quote&#39;'); // returns 'This is a 'quote''
unescape('This is a &amp; symbol'); // returns 'This is a & symbol'
```
