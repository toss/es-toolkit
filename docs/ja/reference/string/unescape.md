# unescape

HTMLエンティティ文字を元の文字に変換します。

```typescript
const result = unescape(str);
```

## 使用法

### `unescape(str)`

HTMLで使用されるエンティティ文字を元の文字に変換したい場合は`unescape`を使用してください。`&amp;`、`&lt;`、`&gt;`、`&quot;`、`&#39;`のようなHTMLエンティティを`&`、`<`、`>`、`"`、`'`文字に変換します。これは[`escape`](./escape.md)関数の逆の操作です。

```typescript
import { unescape } from 'es-toolkit/string';

// HTMLタグエンティティを元の文字に変換
unescape('This is a &lt;div&gt; element.');
// 戻り値: 'This is a <div> element.'

// 引用符エンティティを元の文字に変換
unescape('This is a &quot;quote&quot;');
// 戻り値: 'This is a "quote"'

// 単一引用符エンティティを元の文字に変換
unescape('This is a &#39;quote&#39;');
// 戻り値: 'This is a 'quote''

// アンパサンドエンティティを元の文字に変換
unescape('This is a &amp; symbol');
// 戻り値: 'This is a & symbol'
```

HTMLフォームやURLから受け取ったデータを処理する際に便利です:

```typescript
// ユーザー入力からHTMLエンティティを変換
const userInput = 'My favorite tag is &lt;button&gt;';
const converted = unescape(userInput);
console.log(converted); // 'My favorite tag is <button>'

// 複数のエンティティが混在する文字列も変換可能
const mixed = '&quot;Hello &amp; Welcome&quot; &lt;says the &gt; user';
const result = unescape(mixed);
console.log(result); // '"Hello & Welcome" <says the > user'
```

#### パラメータ

- `str` (`string`): 変換する文字列です。

#### 戻り値

(`string`): HTMLエンティティが元の文字に変換された文字列を返します。
