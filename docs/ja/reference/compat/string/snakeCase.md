# snakeCase (Lodash 互換性)

::: warning `es-toolkit` の `snakeCase` を使用してください

この `snakeCase` 関数は、`null` または `undefined` を処理するための正規化ロジックにより動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [snakeCase](../../string/snakeCase.md) を使用してください。

:::

文字列をスネークケースに変換します。

```typescript
const snakeCased = snakeCase(str);
```

## 参照

### `snakeCase(str)`

文字列をスネークケース (snake_case) に変換したい場合は `snakeCase` を使用してください。スネークケースは、各単語を小文字で書き、アンダースコア (_) で連結する命名規則です。

```typescript
import { snakeCase } from 'es-toolkit/compat';

// キャメルケースの変換
snakeCase('camelCase');
// Returns: 'camel_case'

// 空白で区切られた文字列の変換
snakeCase('some whitespace');
// Returns: 'some_whitespace'

// ハイフンで区切られた文字列の変換
snakeCase('hyphen-text');
// Returns: 'hyphen_text'

// 連続する大文字の処理
snakeCase('HTTPRequest');
// Returns: 'http_request'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { snakeCase } from 'es-toolkit/compat';

snakeCase(null); // ''
snakeCase(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): スネークケースに変換する文字列です。

#### 戻り値

(`string`): スネークケースに変換された文字列を返します。
