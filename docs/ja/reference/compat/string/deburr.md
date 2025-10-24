# deburr (Lodash 互換性)

::: warning `es-toolkit` の `deburr` を使用してください

この `deburr` 関数は、文字列以外の入力値の処理により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [deburr](../../string/deburr.md) を使用してください。

:::

文字列内の特殊文字と発音区別記号をASCII文字に変換します。

```typescript
const result = deburr(str);
```

## 参照

### `deburr(str)`

文字列内の特殊文字と発音区別記号をASCII文字に変換します。多言語テキストを検索やソートに使いやすくする際に便利です。

```typescript
import { deburr } from 'es-toolkit/compat';

deburr('Æthelred'); // 'Aethelred'
deburr('München'); // 'Munchen'
deburr('Crème brûlée'); // 'Creme brulee'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { deburr } from 'es-toolkit/compat';

deburr(123); // '123'
deburr(null); // ''
deburr(undefined); // ''
```

#### パラメータ

- `str` (`string`,オプション): 特殊文字を削除する文字列です。

#### 戻り値

(`string`): 特殊文字と発音区別記号がASCII文字に変換された文字列を返します。
