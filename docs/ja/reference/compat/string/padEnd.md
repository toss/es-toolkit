# padEnd (Lodash 互換性)

::: warning JavaScript の `String.prototype.padEnd` を使用してください

この `padEnd` 関数は、文字列以外の値の処理により、動作が遅くなります。

代わりに、より高速で現代的な JavaScript の `String.prototype.padEnd` を使用してください。

:::

文字列の後ろにパディングを追加して、指定された長さまで伸ばします。

```typescript
const padded = padEnd(str, length, chars);
```

## 参照

### `padEnd(str, length?, chars?)`

文字列が希望する長さより短い場合に、後ろにパディング文字を追加して長さを合わせたい場合は `padEnd` を使用してください。

```typescript
import { padEnd } from 'es-toolkit/compat';

// 空白でパディング
padEnd('abc', 6);
// Returns: 'abc   '

// 特定の文字でパディング
padEnd('abc', 6, '_-');
// Returns: 'abc_-_'

// 元の長さがより長い場合はそのまま返す
padEnd('abc', 3);
// Returns: 'abc'
```

`null` や `undefined` は空文字列として処理されます。

```typescript
import { padEnd } from 'es-toolkit/compat';

padEnd(null, 5, '*');
// Returns: '*****'

padEnd(undefined, 3);
// Returns: '   '
```

#### パラメータ

- `str` (`string`,オプション): パディングを追加する文字列です。
- `length` (`number`,オプション): 希望する最終的な文字列の長さです。デフォルトは `0` です。
- `chars` (`string`,オプション): パディングに使用する文字です。デフォルトは `' '`(空白)です。

#### 戻り値

(`string`): 後ろにパディングが追加された文字列を返します。
