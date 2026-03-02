# escapeRegExp (Lodash 互換性)

::: warning `es-toolkit` の `escapeRegExp` を使用してください

この `escapeRegExp` 関数は、文字列以外の入力値の処理により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [escapeRegExp](../../string/escapeRegExp.md) を使用してください。

:::

文字列内の正規表現特殊文字をエスケープします。

```typescript
const result = escapeRegExp(str);
```

## 使用法

### `escapeRegExp(str)`

文字列内の正規表現特殊文字 `^`、`$`、`\`、`.`、`*`、`+`、`?`、`(`、`)`、`[`、`]`、`{`、`}`、`|` をエスケープします。動的に正規表現を生成する際に文字列を文字通り処理したい場合に便利です。

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp('[es-toolkit](https://es-toolkit.dev/)');
// '\\[es-toolkit\\]\\(https://es-toolkit\\.dev/\\)'

escapeRegExp('$^{}.+*?()[]|\\');
// '\\$\\^\\{\\}\\.\\+\\*\\?\\(\\)\\[\\]\\|\\\\'
```

文字列以外の値も文字列に変換して処理します。

```typescript
import { escapeRegExp } from 'es-toolkit/compat';

escapeRegExp(123); // '123'
escapeRegExp(null); // ''
escapeRegExp(undefined); // ''
```

#### パラメータ

- `str` (`string`,オプション): 正規表現特殊文字をエスケープする文字列です。

#### 戻り値

(`string`): 正規表現特殊文字がエスケープされた文字列を返します。
