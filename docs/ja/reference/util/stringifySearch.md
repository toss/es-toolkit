# stringifySearch

オブジェクトから、URL の末尾に付けるクエリ文字列を作ります。結果は `?a=1&b=2` のように `?` から始まります。

```typescript
const search = stringifySearch(query);
```

## 使用法

### `stringifySearch(query)`

URL にクエリパラメータを付けたいときは `stringifySearch` を使用してください。結果が `?` から始まるので、パスの後ろにそのままつなげられます。

```typescript
import { stringifySearch } from 'es-toolkit/util';

// オブジェクトからクエリ文字列を作ります。
stringifySearch({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world' を返します

// 配列は同じキーを繰り返して表します。空文字列は残り、空の配列は含まれません。
stringifySearch({ tags: ['a', 'b'], q: '', ids: [] });
// '?tags=a&tags=b&q=' を返します

// パスの後ろにつなげます。値が `null` や `undefined` のキーは含まれません。
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// '/items?page=1' を返します

// 付ける値が一つもなければ、パスはそのままです。
`/items${stringifySearch({ ref: undefined })}`;
// '/items' を返します
```

キーと値は `encodeURIComponent` でエンコードします。空白は `%20`、`+` は `%2B` になるので、結果を `URLSearchParams` で読んでも `decodeURIComponent` で読んでも同じ値が得られます。

値にオブジェクトや `Date` を渡すと型エラーになります。`JSON.stringify()` や `toISOString()` で先に文字列にしてから渡してください。

先頭の `?` が不要な場合は、結果に `.slice(1)` を呼び出してください。

#### パラメータ

- `query` (`T`): クエリ文字列にするオブジェクト。各値は文字列、数値、真偽値、`BigInt`、`null`、`undefined`、またはそれらの配列です。

#### 戻り値

(`string`): `?` から始まるクエリ文字列。付ける値がなければ空文字列です。

#### エラー

(`URIError`): キーや値に `'😀'.slice(0, 1)` のような途中で切れた文字が含まれていると、エラーを投げます。
