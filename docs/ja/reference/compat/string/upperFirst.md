# upperFirst (Lodash 互換性)

::: warning `es-toolkit` の `upperFirst` を使用してください

この `upperFirst` 関数は、`null` や `undefined` の処理のための変換ロジックにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [upperFirst](../../string/upperFirst.md) を使用してください。

:::

文字列の最初の文字を大文字に変換します。

```typescript
const upperCased = upperFirst(str);
```

## 使用法

### `upperFirst(str)`

文字列の最初の文字のみを大文字にしたい場合は `upperFirst` を使用します。残りの文字はそのまま保持されます。

```typescript
import { upperFirst } from 'es-toolkit/compat';

// 小文字で始まる文字列
upperFirst('fred');
// 戻り値: 'Fred'

// すでに大文字で始まる文字列
upperFirst('Fred');
// 戻り値: 'Fred'

// すべて大文字の文字列
upperFirst('FRED');
// 戻り値: 'FRED'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { upperFirst } from 'es-toolkit/compat';

upperFirst(null); // ''
upperFirst(undefined); // ''
```

#### パラメータ

- `str` (`string`, オプション): 最初の文字を大文字に変換する文字列。

#### 戻り値

(`string`): 最初の文字が大文字に変換された文字列を返します。
