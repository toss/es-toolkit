# escape

HTMLで特別な意味を持つ文字を安全なエンティティに変換します。

```typescript
const result = escape(str);
```

## 参照

### `escape(str)`

HTMLにテキストを安全に挿入したいときは`escape`を使用します。`&`、`<`、`>`、`"`、`'`のような特殊文字をHTMLエンティティに変換して、XSS攻撃を防止し、HTMLが正しく表示されるようにします。

```typescript
import { escape } from 'es-toolkit/string';

// 基本的なHTML特殊文字の処理
escape('<div>Hello World</div>'); // returns '&lt;div&gt;Hello World&lt;/div&gt;'
escape('Tom & Jerry'); // returns 'Tom &amp; Jerry'
escape('"Hello"'); // returns '&quot;Hello&quot;'
escape("'Hello'"); // returns '&#39;Hello&#39;'
```

ユーザー入力をHTMLに表示するときはセキュリティのために必ず使用する必要があります。

```typescript
import { escape } from 'es-toolkit/string';

// ユーザー入力の処理
const userInput = '<script>alert("XSS")</script>';
const safeHtml = `<div>${escape(userInput)}</div>`;
// returns '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>'

// 動的HTMLの生成
const title = 'Article "How to & Why"';
const html = `<h1>${escape(title)}</h1>`;
// returns '<h1>Article &quot;How to &amp; Why&quot;</h1>'
```

テンプレートやコメントシステムで活用できます。

```typescript
import { escape } from 'es-toolkit/string';

// コメントシステム
function renderComment(comment: string, author: string) {
  return `
    <div class="comment">
      <strong>${escape(author)}</strong>: ${escape(comment)}
    </div>
  `;
}

// 使用例
const html = renderComment('I love <coding> & "programming"!', 'John Doe');
// returns '<div class="comment"><strong>John Doe</strong>: I love &lt;coding&gt; &amp; &quot;programming&quot;!</div>'
```

JSON文字列をHTML属性に入れるときも便利です。

```typescript
import { escape } from 'es-toolkit/string';

const data = { message: 'Hello & "welcome"' };
const jsonString = JSON.stringify(data);
const htmlAttribute = `<div data-info="${escape(jsonString)}"></div>`;
// returns '<div data-info="{&quot;message&quot;:&quot;Hello &amp; \\&quot;welcome\\&quot;&quot;}"></div>'
```

#### パラメータ

- `str` (`string`): HTMLで安全に使用するために変換する文字列です。

#### 戻り値

(`string`): HTMLエンティティに変換された新しい文字列を返します。
