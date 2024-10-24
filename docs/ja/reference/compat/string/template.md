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
// Use the "escape" delimiter to escape data properties.
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the "interpolate" delimiter to interpolate data properties.
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "evaluate" delimiter to evaluate JavaScript code.
const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
compiled({ value: true }); // returns 'Yes'

// Use the "variable" option to specify the data object variable name.
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "imports" option to import functions.
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // returns 'HELLO, WORLD!'

// Use the custom "escape" delimiter.
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the custom "evaluate" delimiter.
const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // returns 'Yes'

// Use the custom "interpolate" delimiter.
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "sourceURL" option to specify the source URL of the template.
const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
```
