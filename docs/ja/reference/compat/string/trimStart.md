# trimStart (Lodash 互換性)

::: warning `es-toolkit` の `trimStart` を使用してください

この `trimStart` 関数は、`null` や `undefined` の処理、パラメータの順序変更などにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [trimStart](../../string/trimStart.md) を使用してください。

:::

文字列の先頭の空白または指定された文字を削除します。

```typescript
const trimmed = trimStart(str, chars);
```

## 参照

### `trimStart(str, chars)`

文字列の先頭から空白または特定の文字を削除したい場合は `trimStart` を使用します。`chars` を指定しない場合は、先頭の空白のみが削除されます。

```typescript
import { trimStart } from 'es-toolkit/compat';

// 先頭の空白を削除
trimStart('  abc  ');
// 戻り値: 'abc  '

// 指定された文字を削除
trimStart('-_-abc-_-', '_-');
// 戻り値: 'abc-_-'

// 文字列の先頭にのみ適用
trimStart('abc', 'c');
// 戻り値: 'abc'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { trimStart } from 'es-toolkit/compat';

trimStart(null); // ''
trimStart(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): 先頭をトリミングする文字列。
- `chars` (`string`, オプション): 削除する文字。指定しない場合は空白が削除されます。

#### 戻り値

(`string`): 先頭から指定された文字が削除された文字列を返します。
