# unescape (Lodash 互換性)

::: warning `es-toolkit` の `unescape` を使用してください

この `unescape` 関数は、`null` や `undefined` の処理のための変換ロジックにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [unescape](../../string/unescape.md) を使用してください。

:::

HTML エンティティを元の文字に変換します。

```typescript
const unescaped = unescape(str);
```

## 使用法

### `unescape(str)`

HTML エンティティ `&amp;`、`&lt;`、`&gt;`、`&quot;`、`&#39;` を元の文字に戻したい場合は `unescape` を使用します。これは `escape` 関数の逆の操作です。

```typescript
import { unescape } from 'es-toolkit/compat';

// HTML タグをアンエスケープ
unescape('This is a &lt;div&gt; element.');
// 戻り値: 'This is a <div> element.'

// 引用符をアンエスケープ
unescape('This is a &quot;quote&quot;');
// 戻り値: 'This is a "quote"'

// アポストロフィをアンエスケープ
unescape('This is a &#39;quote&#39;');
// 戻り値: 'This is a 'quote''

// アンパサンドをアンエスケープ
unescape('This is a &amp; symbol');
// 戻り値: 'This is a & symbol'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { unescape } from 'es-toolkit/compat';

unescape(null); // ''
unescape(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): アンエスケープする文字列。

#### 戻り値

(`string`): HTML エンティティが元の文字に変換された文字列を返します。
