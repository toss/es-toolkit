# stringifySearch

オブジェクトを URL の後ろに付ける `?a=1&b=2` のような文字列に変換します。

```typescript
const search = stringifySearch(query);
```

## 使用法

### `stringifySearch(query)`

URL にクエリパラメータを付けたいときに `stringifySearch` を使用してください。`?` で始まる文字列を返すため、パスの後ろにそのままつなげられます。付ける値がない場合は空文字列を返します。

```typescript
import { stringifySearch } from 'es-toolkit/util';

// オブジェクトをクエリ文字列に変換します。
stringifySearch({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world' を返します

// パスの後ろにつなげます。値が `undefined` のキーは含まれません。
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// '/items?page=1' を返します

// 付ける値がない場合、パスはそのままです。
`/items${stringifySearch({ ref: undefined })}`;
// '/items' を返します
```

各値は次のように変換されます。

| 値                     | 入力                        | 結果                  |
| ---------------------- | --------------------------- | --------------------- |
| 文字列                 | `{ q: 'a b+c' }`            | `'?q=a%20b%2Bc'`      |
| 空文字列               | `{ q: '' }`                 | `'?q='`               |
| 数値、真偽値、`BigInt` | `{ page: 1, open: true }`   | `'?page=1&open=true'` |
| `null`、`undefined`    | `{ a: null, b: undefined }` | `''`                  |
| 配列                   | `{ tags: ['a', 'b'] }`      | `'?tags=a&tags=b'`    |
| 空配列                 | `{ tags: [] }`              | `''`                  |

キーと値は `encodeURIComponent` でエンコードします。空白は `%20`、`+` は `%2B` になるため、結果を `URLSearchParams` で読んでも `decodeURIComponent` で読んでも同じ値になります。

オブジェクトの中のオブジェクトや `Date` はサポートしておらず、渡すと型エラーになります。`JSON.stringify()` や `toISOString()` などで先に文字列に変換してください。

先頭の `?` を除いたクエリだけが必要な場合は `.slice(1)` を使用してください。

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 先頭の `?` を取り除きます。
stringifySearch({ page: 1 }).slice(1);
// 'page=1' を返します
```

#### パラメータ

- `query` (`T`): 変換するオブジェクト。各値は文字列、数値、真偽値、`BigInt`、`null`、`undefined`、またはそれらの配列である必要があります。

#### 戻り値

(`string`): `?` で始まる文字列。付ける値がない場合は空文字列です。

#### エラー

(`URIError`): 絵文字を半分に切ったような壊れた文字がキーや値に含まれている場合にエラーを投げます。
