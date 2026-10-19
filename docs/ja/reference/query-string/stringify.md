# stringify

オブジェクトを URL のクエリ文字列に変換します。

```typescript
const search = stringify(query);
```

## 使用法

### `stringify(query)`

検索語やページ番号などを URL に含めたいときは `stringify` を使用してください。結果は `?page=1&q=hello` のように `?` で始まるので、`/items` のようなパスの後ろにそのまま追加できます。変換する値がなければ空文字列を返します。

```typescript
import { stringify } from 'es-toolkit/query-string';

// オブジェクトをクエリ文字列に変換します。
stringify({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world' を返します

// 配列の各要素は同じキーで追加します。空文字列は残し、空の配列は省略します。
stringify({ tags: ['a', 'b'], q: '', ids: [] });
// '?tags=a&tags=b&q=' を返します

// 結果をパスの後ろに追加します。値が null または undefined の項目は省略します。
`/items${stringify({ page: 1, ref: undefined })}`;
// '/items?page=1' を返します

// すべての値が省略されると空文字列を返すため、パスは変わりません。
`/items${stringify({ ref: undefined })}`;
// '/items' を返します
```

配列内の `null` と `undefined` も省略します。それ以外の値は `String()` で文字列に変換します。

キーと値は `encodeURIComponent` でエンコードします。空白は `%20`、`+` は `%2B` に変換します。

ネストしたオブジェクトや `Date` を値として渡すと、TypeScript の型チェックでエラーになります。`JSON.stringify()` や `toISOString()` で先に文字列に変換してください。

先頭の `?` が不要な場合は、結果に `.slice(1)` を呼び出してください。

#### パラメータ

- `query` (`T`): クエリ文字列に変換するオブジェクト。各値は文字列、数値、真偽値、`bigint`、`null`、`undefined`、またはこれらの値の配列です。

#### 戻り値

(`string`): `?` で始まるクエリ文字列。変換する値がなければ空文字列を返します。

#### エラー

(`URIError`): キーや値に `'😀'.slice(0, 1)` のような対になっていない UTF-16 サロゲートが含まれると、エラーをスローします。
