# template (Lodash 互換性)

::: warning JavaScript テンプレートリテラルを使用してください

この `template` 関数は複雑な文字列処理のため、動作が遅くなります。

代わりに、より高速で現代的な JavaScript テンプレートリテラルを使用してください。

:::

文字列テンプレートに値を挿入して新しい文字列を生成する関数を作成します。

```typescript
const compiled = template(templateString);
```

## 使用法

### `template(string, options?)`

文字列テンプレートにデータを挿入して完成した文字列を作成したい場合は、`template` を使用してください。値を安全にエスケープしたり、そのまま挿入したり、JavaScript コードを実行したりできます。

基本的な使い方で値を挿入またはエスケープできます。

```typescript
import { template } from 'es-toolkit/compat';

// 値をそのまま挿入
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' });
// 戻り値: 'Hello, World!'

// HTML を安全にエスケープ
const safeCompiled = template('<%- value %>');
safeCompiled({ value: '<script>alert("xss")</script>' });
// 戻り値: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

JavaScript コードを実行することもできます。

```typescript
import { template } from 'es-toolkit/compat';

// 条件文を使用
const compiled = template('<% if (user) { %>こんにちは <%= user %>さん!<% } %>');
compiled({ user: 'es-toolkit' });
// 戻り値: 'こんにちは es-toolkitさん!'

// ループを使用
const listTemplate = template('<% users.forEach(function(user) { %><li><%= user %></li><% }); %>');
listTemplate({ users: ['太郎', '花子', '次郎'] });
// 戻り値: '<li>太郎</li><li>花子</li><li>次郎</li>'
```

変数名を指定して安全に使用できます。

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= data.name %>さんの年齢は <%= data.age %>歳です', {
  variable: 'data',
});
compiled({ name: '太郎', age: 25 });
// 戻り値: '太郎さんの年齢は 25歳です'
```

外部関数をインポートして使用できます。

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= _.toUpper(message) %>', {
  imports: { _: { toUpper: str => str.toUpperCase() } },
});
compiled({ message: 'hello world' });
// 戻り値: 'HELLO WORLD'
```

カスタム区切り文字も作成できます。

```typescript
import { template } from 'es-toolkit/compat';

// カスタム区切り文字で値を挿入
const compiled = template('{{ message }}', {
  interpolate: /\{\{([\s\S]+?)\}\}/g,
});
compiled({ message: 'こんにちは!' });
// 戻り値: 'こんにちは!'

// カスタム区切り文字でエスケープ
const safeCompiled = template('[- html -]', {
  escape: /\[-([\s\S]+?)-\]/g,
});
safeCompiled({ html: '<div>内容</div>' });
// 戻り値: '&lt;div&gt;内容&lt;/div&gt;'
```

#### パラメータ

- `string` (`string`): テンプレート文字列です。
- `options` (`object`, オプション): 設定オブジェクトです。
  - `options.escape` (`RegExp`, オプション): HTML をエスケープする区切り文字の正規表現です。デフォルトは `<%-([\s\S]+?)%>` です。
  - `options.evaluate` (`RegExp`, オプション): JavaScript コードを実行する区切り文字の正規表現です。デフォルトは `<%([\s\S]+?)%>` です。
  - `options.interpolate` (`RegExp`, オプション): 値を挿入する区切り文字の正規表現です。デフォルトは `<%=([\s\S]+?)%>` です。
  - `options.variable` (`string`, オプション): データオブジェクトの変数名です。
  - `options.imports` (`object`, オプション): テンプレートで使用する関数です。
  - `options.sourceURL` (`string`, オプション): デバッグ用のソース URL です。

#### 戻り値

(`TemplateExecutor`): データオブジェクトを受け取って完成した文字列を返す関数です。生成された関数コードは `source` プロパティで確認できます。
