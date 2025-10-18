# trimEnd (Lodash 互換性)

::: warning `es-toolkit` の `trimEnd` を使用してください

この `trimEnd` 関数は、`null` や `undefined` の処理、パラメータの順序変更などにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [trimEnd](../../string/trimEnd.md) を使用してください。

:::

文字列の末尾の空白または指定された文字を削除します。

```typescript
const trimmed = trimEnd(str, chars);
```

## 参照

### `trimEnd(str, chars)`

文字列の末尾から空白または特定の文字を削除したい場合は `trimEnd` を使用します。`chars` を指定しない場合は、末尾の空白のみが削除されます。

```typescript
import { trimEnd } from 'es-toolkit/compat';

// 末尾の空白を削除
trimEnd('  abc  ');
// 戻り値: '  abc'

// 指定された文字を削除
trimEnd('-_-abc-_-', '_-');
// 戻り値: '-_-abc'

// 文字列の末尾にのみ適用
trimEnd('abc', 'a');
// 戻り値: 'abc'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { trimEnd } from 'es-toolkit/compat';

trimEnd(null); // ''
trimEnd(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): 末尾をトリミングする文字列。
- `chars` (`string`, オプション): 削除する文字。指定しない場合は空白が削除されます。

#### 戻り値

(`string`): 末尾から指定された文字が削除された文字列を返します。
