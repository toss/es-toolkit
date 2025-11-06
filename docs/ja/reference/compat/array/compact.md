# compact (Lodash 互換性)

::: warning `es-toolkit`の[`compact`](../../array/compact.md)を使用してください

この `compact` 関数は、`null` や `undefined` の処理、`size` のデフォルト値処理などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [compact](../../array/compact.md) を使用してください。

:::

配列から偽値と評価される値を削除します。

```typescript
const compacted = compact(arr);
```

## 使用法

### `compact(arr)`

配列から `false`、`null`、`0`、`""`、`undefined`、`NaN` のような偽値と評価される値を削除したい場合、`compact` を使用してください。

```typescript
import { compact } from 'es-toolkit/compat';

// 偽値と評価される値を削除
compact([0, 1, false, 2, '', 3]);
// Returns: [1, 2, 3]

compact(['a', null, 'b', undefined, 'c', NaN]);
// Returns: ['a', 'b', 'c']

// BigInt 0も削除
compact([0n, 1n, false, 2n]);
// Returns: [1n, 2n]

// 空配列も処理
compact([]);
// Returns: []

// すべての値が偽値と評価される場合
compact([false, null, 0, '', undefined, NaN]);
// Returns: []
```

真値と評価される値はそのまま保持されます。

```typescript
import { compact } from 'es-toolkit/compat';

compact([1, 'hello', true, {}, []]);
// Returns: [1, 'hello', true, {}, []]

// 0以外の数値
compact([0, -1, 2, -3]);
// Returns: [-1, 2, -3]
```

`null` や `undefined` の配列は空配列として処理されます。

```typescript
import { compact } from 'es-toolkit/compat';

compact(null);
// Returns: []

compact(undefined);
// Returns: []
```

#### パラメータ

- `arr` (`ArrayLike<T> | null | undefined`): 圧縮する配列です。

#### 戻り値

(`T[]`): 偽値と評価される値が削除された新しい配列を返します。
