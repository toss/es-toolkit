# escape (Lodash 互換性)

::: warning `es-toolkit` の `escape` を使用してください

この `escape` 関数は、文字列以外の入力値の処理により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [escape](../../string/escape.md) を使用してください。

:::

文字列内のHTML特殊文字をHTMLエンティティに変換します。

```typescript
const result = escape(str);
```

## 参照

### `escape(str)`

文字列内の `&`、`<`、`>`、`"`、`'` 文字を対応するHTMLエンティティに変換します。HTML文書にテキストを安全に挿入する際にXSS攻撃を防ぐのに便利です。

```typescript
import { escape } from 'es-toolkit/compat';

escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
escape('This is a & symbol'); // 'This is a &amp; symbol'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { escape } from 'es-toolkit/compat';

escape(123); // '123'
escape(null); // ''
escape(undefined); // ''
```

#### パラメータ

- `str` (`string`,オプション): HTML特殊文字をエスケープする文字列です。

#### 戻り値

(`string`): HTML特殊文字がエンティティに変換された文字列を返します。
