# repeat (Lodash 互換性)

::: warning JavaScript の `String.prototype.repeat` を使用してください

この `repeat` 関数は、文字列以外の値の処理と整数変換により、動作が遅くなります。

代わりに、より高速で現代的な JavaScript の `String.prototype.repeat` を使用してください。

:::

文字列を指定された回数だけ繰り返します。

```typescript
const repeated = repeat(str, n);
```

## 使用法

### `repeat(str, n?)`

文字列を複数回繰り返して新しい文字列を作成したい場合は `repeat` を使用してください。繰り返し回数が1未満の場合は空文字列を返します。

```typescript
import { repeat } from 'es-toolkit/compat';

// 文字列を繰り返す
repeat('abc', 2);
// Returns: 'abcabc'

repeat('hello', 3);
// Returns: 'hellohellohello'

// 0回繰り返すと空文字列
repeat('abc', 0);
// Returns: ''
```

`null` や `undefined` は空文字列として処理されます。

```typescript
import { repeat } from 'es-toolkit/compat';

repeat(null, 3);
// Returns: ''

repeat(undefined, 2);
// Returns: ''
```

繰り返し回数を指定しない場合は1回繰り返します。

```typescript
import { repeat } from 'es-toolkit/compat';

repeat('abc');
// Returns: 'abc'
```

#### パラメータ

- `str` (`string`,オプション): 繰り返す文字列です。
- `n` (`number`,オプション): 繰り返す回数です。デフォルトは `1` です。

#### 戻り値

(`string`): 指定された回数だけ繰り返された文字列を返します。
