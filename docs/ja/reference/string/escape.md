# escape

`"&"`、`"<"`、`">"`、`'"'`、および "\`" のような文字列を、HTMLで安全に使用できるエンティティ文字列に変換します。例えば、`"<"` は `"&lt;"` に変換されます。

## インターフェース

```typescript
function escape(str: string): string;
```

### パラメータ

- `str` (`string`): HTMLで安全に使用するために変換する文字列。

### 戻り値

(`string`): 変換された文字列。

## 例

```typescript
import { escape } from 'es-toolkit/string';

escape('This is a <div> element.'); // returns 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // returns 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // returns 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // returns 'This is a &amp; symbol'
```
