# isURL

与えられた値が有効なURL文字列かどうかを確認します。

JavaScriptの組み込みURL constructorを使用してURLを検証します。
有効なURL形式にはプロトコル（http、httpsなど）を含める必要があります。

相対URLをチェックする場合は、2番目のパラメータとしてベースURLを提供できます。

TypeScriptのタイプガードとして使用できます。パラメータとして与えられた値の型を`string`に絞り込みます。

## インターフェース

```typescript
function isURL(value: unknown, base?: string): value is string;
```

### パラメータ

- `value`(`unknown`): URLの有効性を確認する値。
- `base`(`string`, オプション): `value`が相対URLの場合のベースURL。

### 戻り値

(`value is string`): 値が有効なURLであれば`true`、そうでなければ`false`。

## 例

```typescript
isURL('https://example.com'); // true
isURL('http://localhost:3000'); // true
isURL('https://example.com/path?query=123#hash'); // true
isURL('ftp://ftp.example.com'); // true
isURL('ws://websocket.example.com'); // true
isURL('file:///path/to/file'); // true

// ベースURLパラメータの使用
isURL('/products', 'https://example.com'); // true
isURL('about', 'https://example.com/'); // true
isURL('category/shoes', 'https://shop.example.com'); // true
isURL('#section', 'https://example.com/page'); // true
isURL('?query=value', 'https://example.com/page'); // true

isURL('example.com'); // false (プロトコルなし)
isURL('not a url'); // false
isURL(''); // false
isURL('http://'); // false

// ベースURLがあっても無効な相対URL
isURL('', 'https://example.com'); // false
isURL('not a url', 'https://example.com'); // false
isURL('!#$%@#!#@', 'https://example.com'); // false

isURL(123); // false
isURL(null); // false
isURL(undefined); // false
```
