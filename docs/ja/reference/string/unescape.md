# unescape

`"&amp;"`、`"&lt;"`、`"&gt;"`、`"&quot;"`、および `"&#39;"` のようなHTMLエンティティ文字列を元の文字列に戻します。これは[escape](./escape.md)の逆の操作です。

## インターフェース

```typescript
function unescape(str: string): string;
```

### パラメータ

- `str` (`string`): 変換する文字列。

### 戻り値

(`string`): 変換された文字列。

## 例

```typescript
import { unescape } from 'es-toolkit/string';

unescape('This is a &lt;div&gt; element.'); // returns 'This is a <div> element.'
unescape('This is a &quot;quote&quot;'); // returns 'This is a "quote"'
unescape('This is a &#39;quote&#39;'); // returns 'This is a 'quote''
unescape('This is a &amp; symbol'); // returns 'This is a & symbol'
```
