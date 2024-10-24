# template

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

テンプレート文字列をレンダリングする関数を作成します。

返された関数は、値を安全にエスケープしたり、値を評価したり、値を結合して文字列を作成するために使用できます。変数名や関数呼び出しなどのJavaScript式を評価することができます。

## インターフェース

```typescript
function template(string: string, options?: TemplateOptions): ((data?: object) => string) & { source: string };
```

### パラメータ

- `string` (`string`): テンプレート文字列です。
- `options.escape` (`RegExp`): 「escape」デリミタの正規表現です。
- `options.evaluate` (`RegExp`): 「evaluate」デリミタの正規表現です。
- `options.interpolate` (`RegExp`): 「interpolate」デリミタの正規表現です。
- `options.variable` (`string`): データオブジェクトの変数名です。
- `options.imports` (`Record<string, unknown>`): インポートされた関数のオブジェクトです。
- `options.sourceURL` (`string`): テンプレートのソースURLです。
- `guard` (`unknown`): 関数が`options`付きで呼び出されたかどうかを検出するガードです。

### 戻り値

(`(data?: object) => string`): コンパイルされたテンプレート関数を返します。

## 例

```typescript
// "escape" デリミタを使用して値を安全にエスケープできます。
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // '&lt;div&gt;'を返します

// "interpolate" デリミタを使用して値を結合した文字列を作成できます。
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' }); // 'Hello, World!'を返します

// "evaluate" デリミタを使用して JavaScript 式を評価できます。
const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
compiled({ value: true }); // 'Yes'を返します

// "variable" デリミタを使用して変数やプロパティ値にアクセスできます。
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: 'Hello, World!' }); // 'Hello, World!'を返します

// "imports" オプションを使用して関数をインポートできます。
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // 'HELLO, WORLD!'を返します

// カスタム "escape" デリミタを使用する方法
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // '&lt;div&gt;'を返します

// カスタム "evaluate" デリミタを使用する方法
const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // 'Yes'を返します

// カスタム "interpolate" デリミタを使用する方法
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: 'Hello, World!' }); // 'Hello, World!'を返します

// "sourceURL" オプションでテンプレートのソース URL を指定できます。
const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
```
