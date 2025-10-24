# lowerFirst (Lodash 互換性)

::: warning `es-toolkit` の `lowerFirst` を使用してください

この `lowerFirst` 関数は、文字列以外の入力値の処理により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [lowerFirst](../../string/lowerFirst.md) を使用してください。

:::

文字列の最初の文字を小文字に変換します。

```typescript
const result = lowerFirst(str);
```

## 参照

### `lowerFirst(str)`

文字列の最初の文字を小文字に変換します。残りの文字はそのまま維持されます。camelCase変数名を作成したり、最初の文字だけ小文字にしたい場合に便利です。

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst('fred'); // 'fred'
lowerFirst('Fred'); // 'fred'
lowerFirst('FRED'); // 'fRED'
lowerFirst(''); // ''
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { lowerFirst } from 'es-toolkit/compat';

lowerFirst(123); // '123'
lowerFirst(null); // ''
lowerFirst(undefined); // ''
```

#### パラメータ

- `str` (`string`,オプション): 最初の文字を小文字に変換する文字列です。

#### 戻り値

(`string`): 最初の文字が小文字に変換された文字列を返します。
