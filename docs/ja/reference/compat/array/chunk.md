# chunk（Lodash 互換性）

::: warning `es-toolkit` の [`chunk`](../../array/chunk.md) を使用してください

この `chunk` 関数は `null`、`undefined` の処理、`size` のデフォルト値処理などにより動作が遅くなります。

より高速でモダンな実装である `es-toolkit` の [chunk](../../array/chunk.md) を使用してください。

:::

配列を指定されたサイズの小さな配列に分割します。

```typescript
const chunked = chunk(arr, size);
```

## 使用法

### `chunk(arr, size?)`

長い配列を同じサイズの複数の小さな配列に分割したい場合は `chunk` を使用します。配列を均等に分割できない場合、最後の配列に残りの要素が含まれます。

```typescript
import { chunk } from 'es-toolkit/compat';

// 数値配列をサイズ 2 のチャンクに分割します。
chunk([1, 2, 3, 4], 2);
// 戻り値: [[1, 2], [3, 4]]

// 文字列配列をサイズ 3 のチャンクに分割します。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// 戻り値: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// 均等に分割できない場合
chunk([1, 2, 3, 4, 5], 2);
// 戻り値: [[1, 2], [3, 4], [5]]
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2);
// 戻り値: []

chunk(undefined, 2);
// 戻り値: []
```

サイズが 0 または負の場合、空の配列を返します。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0);
// 戻り値: []

chunk([1, 2, 3], -1);
// 戻り値: []
```

#### パラメータ

- `arr` (`ArrayLike<T> | null | undefined`): 分割する配列。
- `size` (`number`, オプション): 各小さな配列のサイズ。デフォルト値は `1`。

#### 戻り値

(`T[][]`): サイズ `size` で分割された二次元配列を返します。
