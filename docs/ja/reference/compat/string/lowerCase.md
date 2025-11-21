# lowerCase (Lodash 互換性)

::: warning `es-toolkit` の `lowerCase` を使用してください

この `lowerCase` 関数は、文字列以外の入力値の処理と短縮アポストロフィの除去などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [lowerCase](../../string/lowerCase.md) を使用してください。

:::

文字列を小文字の単語にスペースで区切って変換します。

```typescript
const result = lowerCase(str);
```

## 使用法

### `lowerCase(str)`

文字列を小文字の単語にスペースで区切って変換します。各単語は小文字に変換され、スペース文字で連結されます。人間が読みやすいテキスト形式にする際に便利です。

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase('camelCase'); // 'camel case'
lowerCase('some whitespace'); // 'some whitespace'
lowerCase('hyphen-text'); // 'hyphen text'
lowerCase('HTTPRequest'); // 'http request'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { lowerCase } from 'es-toolkit/compat';

lowerCase(123); // '123'
lowerCase(null); // ''
lowerCase(undefined); // ''
```

#### パラメータ

- `str` (`string | object`,オプション): 小文字形式に変換する値です。

#### 戻り値

(`string`): 小文字の単語がスペースで区切られた文字列を返します。
