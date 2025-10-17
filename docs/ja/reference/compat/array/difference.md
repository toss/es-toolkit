# difference (Lodash 互換性)

::: warning `es-toolkit`の`difference`を使用してください

この `difference` 関数は、`null` や `undefined` の処理、複数の配列引数処理により、複雑に動作します。

代わりに、より高速で現代的な `es-toolkit` の [difference](../../array/difference.md) を使用してください。

:::

最初の配列から他の配列の値を除いた差集合を求めます。

```typescript
const result = difference(arr, ...values);
```

## 参照

### `difference(arr, ...values)`

最初の配列から残りの配列に含まれる値をすべて削除したい場合、`difference` を使用してください。順序は最初の配列の順序を保持します。

```typescript
import { difference } from 'es-toolkit/compat';

// 基本的な使用法
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const array3 = [5, 6];
difference(array1, array2, array3);
// Returns: [1, 3]

// 文字列配列
difference(['a', 'b', 'c'], ['b'], ['c', 'd']);
// Returns: ['a']

// 重複する値の処理
difference([1, 2, 2, 3], [2]);
// Returns: [1, 3]
```

空配列や空の差集合も処理します。

```typescript
import { difference } from 'es-toolkit/compat';

// 空配列との差集合
difference([1, 2, 3], []);
// Returns: [1, 2, 3]

// すべての値が除外される場合
difference([1, 2, 3], [1, 2, 3]);
// Returns: []

// 重複する値がない場合
difference([1, 2], [3, 4]);
// Returns: [1, 2]
```

`null` や `undefined` の配列は空配列として処理されます。

```typescript
import { difference } from 'es-toolkit/compat';

difference(null, [1, 2]);
// Returns: []

difference(undefined, [1, 2]);
// Returns: []

difference([1, 2, 3], null, undefined);
// Returns: [1, 2, 3] (nullとundefinedは無視されます)
```

配列風オブジェクトもサポートします。

```typescript
import { difference } from 'es-toolkit/compat';

// 配列風オブジェクト
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };
difference(arrayLike1, arrayLike2);
// Returns: [1, 3]
```

#### パラメータ

- `arr` (`ArrayLike<T> | null | undefined`): 差集合を求める基準配列です。
- `values` (`...ArrayLike<T>[]`): 除外する値を含む配列です。

#### 戻り値

(`T[]`): 最初の配列から他の配列の値を除いた新しい配列を返します。
