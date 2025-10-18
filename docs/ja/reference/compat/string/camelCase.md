# camelCase (Lodash 互換性)

::: warning `es-toolkit` の `camelCase` を使用してください

この `camelCase` 関数は、文字列以外の入力値の処理と短縮アポストロフィの除去などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [camelCase](../../string/camelCase.md) を使用してください。

:::

文字列をキャメルケースに変換します。

```typescript
const result = camelCase(str);
```

## 参照

### `camelCase(str)`

文字列をキャメルケースに変換します。キャメルケースは、最初の単語を小文字で始め、後続の単語の最初の文字を大文字にして、スペースなしで連結する命名規則です。

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase('camelCase'); // 'camelCase'
camelCase('some whitespace'); // 'someWhitespace'
camelCase('hyphen-text'); // 'hyphenText'
camelCase('HTTPRequest'); // 'httpRequest'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { camelCase } from 'es-toolkit/compat';

camelCase(123); // '123'
camelCase(null); // ''
camelCase(undefined); // ''
```

#### パラメータ

- `str` (`string | object`,オプション): キャメルケースに変換する値です。

#### 戻り値

(`string`): キャメルケースに変換された文字列を返します。
