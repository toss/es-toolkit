# trim (Lodash 互換性)

::: warning `es-toolkit` の `trim` を使用してください

この `trim` 関数は、`null` や `undefined` の処理、配列型の `chars` 処理などにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [trim](../../string/trim.md) を使用してください。

:::

文字列の先頭と末尾の空白または指定された文字を削除します。

```typescript
const trimmed = trim(str, chars);
```

## 参照

### `trim(str, chars)`

文字列の先頭と末尾から空白または特定の文字を削除したい場合は `trim` を使用します。`chars` を指定しない場合は、先頭と末尾の空白のみが削除されます。

```typescript
import { trim } from 'es-toolkit/compat';

// 先頭と末尾の空白を削除
trim('  hello  ');
// 戻り値: 'hello'

// 指定された文字を削除
trim('--hello--', '-');
// 戻り値: 'hello'

// 配列で複数の文字を削除
trim('##hello##', ['#', 'o']);
// 戻り値: 'hell'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { trim } from 'es-toolkit/compat';

trim(null); // ''
trim(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): トリミングする文字列。
- `chars` (`string`, オプション): 削除する文字。指定しない場合は空白が削除されます。

#### 戻り値

(`string`): 先頭と末尾から指定された文字が削除された文字列を返します。
