# pad (Lodash 互換性)

::: warning `es-toolkit` の `pad` を使用してください

この `pad` 関数は、`null` や `undefined` の処理などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [pad](../../string/pad.md) を使用してください。

:::

文字列の前後にパディング文字を追加して、指定された長さに合わせます。

```typescript
const padded = pad(str, length, chars);
```

## 参照

### `pad(str, length, chars)`

文字列が希望する長さより短い場合に、前後にパディング文字を追加して長さを合わせたい場合は `pad` を使用してください。パディング文字が均等に分割されない場合、追加の文字は右側に配置されます。

```typescript
import { pad } from 'es-toolkit/compat';

// デフォルトの空白でパディング
pad('abc', 8);
// Returns: '  abc   '

// 指定した文字でパディング
pad('abc', 8, '_-');
// Returns: '_-abc_-_'

// すでに十分な長さならそのまま返す
pad('abc', 3);
// Returns: 'abc'

// 長さがより短いならそのまま返す
pad('abc', 2);
// Returns: 'abc'
```

`null` や `undefined` は空文字列として処理されます。

```typescript
import { pad } from 'es-toolkit/compat';

pad(null, 5); // '     '
pad(undefined, 3, '*'); // '***'
```

#### パラメータ

- `str` (`string`,オプション): パディングする文字列です。
- `length` (`number`,オプション): 目標の長さです。デフォルトは `0` です。
- `chars` (`string`,オプション): パディングに使用する文字です。デフォルトは空白 `' '` です。

#### 戻り値

(`string`): 指定された長さまでパディングされた文字列を返します。
