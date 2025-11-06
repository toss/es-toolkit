# unzipWith (Lodash互換)

::: warning `es-toolkit`の`unzipWith`を使用してください

この`unzipWith`関数は`null`または`undefined`の処理、`ArrayLike`タイプ処理、さまざまな条件関数形式のサポートなどにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[unzipWith](../../array/unzipWith.md)を使用してください。

:::

グループ化された配列の同じ位置にある要素を集めて変換関数を適用した新しい配列を作成します。

```typescript
const result = unzipWith(array, iteratee);
```

## 使用法

### `unzipWith(array, iteratee)`

ネストした配列の同じインデックスにある要素を集めて変換関数を適用します。`unzip`関数と似ていますが、各グループに変換関数を適用できます。変換関数を提供しない場合、デフォルトの`unzip`操作を実行します。

```typescript
import { unzipWith } from 'es-toolkit/compat';

// 同じ位置の要素を足す
unzipWith(
  [
    [1, 10, 100],
    [2, 20, 200],
  ],
  (a, b) => a + b
);
// 戻り値: [3, 30, 300]

// 変換関数なしで使用（デフォルトunzip操作）
unzipWith([
  [1, 4],
  [2, 5],
  [3, 6],
]);
// 戻り値: [[1, 2, 3], [4, 5, 6]]

// 文字列連結
unzipWith(
  [
    ['a', 'x'],
    ['b', 'y'],
    ['c', 'z'],
  ],
  (a, b) => a + b
);
// 戻り値: ['abc', 'xyz']

// 最大値を探す
unzipWith(
  [
    [1, 10],
    [2, 20],
    [3, 5],
  ],
  Math.max
);
// 戻り値: [3, 20]
```

`null`、`undefined`、または空配列は空配列として扱われます。

```typescript
import { unzipWith } from 'es-toolkit/compat';

unzipWith(null, (a, b) => a + b); // []
unzipWith(undefined, (a, b) => a + b); // []
unzipWith([], (a, b) => a + b); // []
```

#### パラメータ

- `array` (`ArrayLike<ArrayLike<T>> | null | undefined`): アンジップするネストした配列。
- `iteratee` (`(...values: T[]) => R`, 選択): 各グループの要素に適用する変換関数。提供しない場合、デフォルトの`unzip`操作を実行します。

#### 戻り値

(`R[]`または`T[][]`): 変換関数がある場合は変換された結果の配列を、ない場合はアンジップされた配列を返します。
