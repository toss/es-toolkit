# dropRight (Lodash 互換性)

::: warning `es-toolkit` の `dropRight` を使用してください

この `dropRight` 関数は、`null` や `undefined` の処理、`guard` パラメータ処理、`toInteger` 変換などにより遅く動作します。

代わりに、より高速で現代的な `es-toolkit` の [`dropRight`](../../array/dropRight.md) を使用してください。

:::

配列の末尾から指定された個数の要素を削除した新しい配列を返します。

```typescript
const result = dropRight(array, itemsCount);
```

## 使用法

### `dropRight(array, itemsCount)`

配列の末尾から特定の個数の要素を削除し、残りの要素で新しい配列を作成したい場合に `dropRight` を使用します。

```typescript
import { dropRight } from 'es-toolkit/compat';

// 数値配列から末尾の2つの要素を削除します。
dropRight([1, 2, 3, 4, 5], 2);
// 戻り値: [1, 2, 3]

// 文字列配列から末尾の1つの要素を削除します。
dropRight(['a', 'b', 'c'], 1);
// 戻り値: ['a', 'b']

// 削除する個数を指定しない場合、デフォルト値1が使用されます。
dropRight([1, 2, 3]);
// 戻り値: [1, 2]
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { dropRight } from 'es-toolkit/compat';

dropRight(null, 2); // []
dropRight(undefined, 2); // []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を削除する配列です。
- `itemsCount` (`number`, オプション): 配列の末尾から削除する要素の個数です。デフォルトは `1` です。

#### 戻り値

(`T[]`): 末尾から `itemsCount` 個の要素が削除された新しい配列を返します。
