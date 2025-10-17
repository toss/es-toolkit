# capitalize (Lodash 互換性)

::: warning `es-toolkit` の `capitalize` を使用してください

この `capitalize` 関数は、文字列以外の入力値の処理により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [capitalize](../../string/capitalize.md) を使用してください。

:::

文字列の最初の文字を大文字に、残りの文字を小文字に変換します。

```typescript
const result = capitalize(str);
```

## 参照

### `capitalize(str)`

文字列の最初の文字を大文字に、残りの文字を小文字に変換します。単語の第一印象を良くしたり、タイトル形式にする際に便利です。

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize('fred'); // 'Fred'
capitalize('FRED'); // 'Fred'
capitalize('fRED'); // 'Fred'
```

空文字列や文字列以外の値も処理できます。

```typescript
import { capitalize } from 'es-toolkit/compat';

capitalize(''); // ''
capitalize(123); // '123'
capitalize(null); // ''
capitalize(undefined); // ''
```

#### パラメータ

- `str` (`string`,オプション): 最初の文字を大文字に変換する文字列です。

#### 戻り値

(`string`): 最初の文字が大文字で残りが小文字の文字列を返します。
