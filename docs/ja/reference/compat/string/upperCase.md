# upperCase (Lodash 互換性)

::: warning `es-toolkit` の `upperCase` を使用してください

この `upperCase` 関数は、`null` や `undefined` の処理のための正規化ロジックにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [upperCase](../../string/upperCase.md) を使用してください。

:::

文字列をアッパーケースに変換します。

```typescript
const upperCased = upperCase(str);
```

## 参照

### `upperCase(str)`

文字列をアッパーケース (UPPER CASE) に変換したい場合は `upperCase` を使用します。アッパーケースは、各単語を大文字で書き、スペースで接続する命名規則です。

```typescript
import { upperCase } from 'es-toolkit/compat';

// キャメルケースを変換
upperCase('camelCase');
// 戻り値: 'CAMEL CASE'

// スペース区切りの文字列を変換
upperCase('some whitespace');
// 戻り値: 'SOME WHITESPACE'

// ハイフン区切りの文字列を変換
upperCase('hyphen-text');
// 戻り値: 'HYPHEN TEXT'

// 大文字が連続して現れる場合
upperCase('HTTPRequest');
// 戻り値: 'HTTP REQUEST'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { upperCase } from 'es-toolkit/compat';

upperCase(null); // ''
upperCase(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): アッパーケースに変換する文字列。

#### 戻り値

(`string`): アッパーケースに変換された文字列を返します。
