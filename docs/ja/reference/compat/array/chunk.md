# chunk (Lodash互換性)

::: warning `es-toolkit`の`chunk`を使用してください

この`chunk`関数は、`null`や`undefined`の処理、`size`のデフォルト値の処理などにより動作が遅くなります。

より高速で現代的な`es-toolkit`の[chunk](../../array/chunk.md)を使用してください。

:::

配列を指定されたサイズの小さな配列に分割します。

```typescript
const chunked = chunk(arr, size);
```

## リファレンス

### `chunk(arr, size)`

長い配列を同じサイズの複数の小さな配列に分割したい場合は、`chunk`を使用してください。配列を均等に分割できない場合、最後の配列が残りの要素を含みます。

```typescript
import { chunk } from 'es-toolkit/compat';

// 数値配列をサイズ2に分割します。
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// 文字列配列をサイズ3に分割します。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

`null`や`undefined`は空の配列として処理されます。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2); // []
chunk(undefined, 2); // []
```

#### パラメータ

- `arr` (`ArrayLike<T>`): 分割する配列です。
- `size` (`number`, オプション): 各小さな配列のサイズです。1より大きい整数でなければなりません。デフォルトは`1`です。

### 戻り値

(`T[][]`): サイズ`size`に分割された2次元配列を返します。
