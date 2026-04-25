# drop (Lodash 互換性)

::: warning `es-toolkit` の `drop` を使用してください

この `drop` 関数は、`null` や `undefined` の処理、`toInteger` 変換などにより複雑に動作します。

代わりに、より高速で現代的な `es-toolkit` の [`drop`](../../array/drop.md) を使用してください。

:::

配列の先頭から指定された個数の要素を削除します。

```typescript
const result = drop(array, n);
```

## 使用法

### `drop(array, n?)`

配列の先頭からいくつかの要素を削除し、残りを取得したい場合に `drop` を使用します。デフォルトでは、最初の要素を1つ削除します。

```typescript
import { drop } from 'es-toolkit/compat';

// 基本的な使用法(最初の要素を削除)
drop([1, 2, 3, 4, 5]);
// 戻り値: [2, 3, 4, 5]

// 最初の2つの要素を削除
drop([1, 2, 3, 4, 5], 2);
// 戻り値: [3, 4, 5]

// 最初の3つの要素を削除
drop(['a', 'b', 'c', 'd'], 3);
// 戻り値: ['d']
```

0または負の数を指定すると、元の配列をそのまま返します。

```typescript
import { drop } from 'es-toolkit/compat';

// 0個削除
drop([1, 2, 3], 0);
// 戻り値: [1, 2, 3]

// 負の数を指定
drop([1, 2, 3], -1);
// 戻り値: [1, 2, 3]
```

配列より大きい数を指定すると、空の配列を返します。

```typescript
import { drop } from 'es-toolkit/compat';

// 配列のサイズより大きい数を指定
drop([1, 2, 3], 5);
// 戻り値: []

// 空の配列から削除
drop([], 1);
// 戻り値: []
```

`null` または `undefined` の配列は空の配列として処理されます。

```typescript
import { drop } from 'es-toolkit/compat';

drop(null, 1);
// 戻り値: []

drop(undefined, 2);
// 戻り値: []
```

配列風オブジェクトもサポートされています。

```typescript
import { drop } from 'es-toolkit/compat';

// 配列風オブジェクト
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
drop(arrayLike, 1);
// 戻り値: ['b', 'c']
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 要素を削除する配列です。
- `n` (`number`, オプション): 削除する要素の個数です。デフォルトは `1` です。

#### 戻り値

(`T[]`): 先頭から指定された個数の要素が削除された新しい配列を返します。
