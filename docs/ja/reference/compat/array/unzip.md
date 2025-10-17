# unzip (Lodash互換)

::: warning `es-toolkit`の[unzip](../../array/unzip.md)を使用してください

この`unzip`関数は`null`または`undefined`の処理、配列でない値のフィルタリングなどにより動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[unzip](../../array/unzip.md)を使用してください。

:::

グループ化された配列の同じ位置にある要素を集めて新しい配列を作成します。

```typescript
const result = unzip(array);
```

## 参照

### `unzip(array)`

ネストした配列の同じインデックスにある要素を集めて新しい配列として返します。`zip`関数の逆の操作を実行します。行列を転置したり構造化データを再編成するときに便利です。

```typescript
import { uniqWith } from 'es-toolkit/compat';

// 文字列、ブール値、数値が混在した配列をアンジップ
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
];
const result = unzip(zipped);
// 戻り値: [['a', 'b'], [true, false], [1, 2]]

// 数値配列をアンジップ
const numbers = [
  [1, 4],
  [2, 5],
  [3, 6],
];
unzip(numbers);
// 戻り値: [[1, 2, 3], [4, 5, 6]]

// 長さが異なる配列も処理
const uneven = [
  ['a', 1],
  ['b', 2, true],
];
unzip(uneven);
// 戻り値: [['a', 'b'], [1, 2], [undefined, true]]
```

`null`、`undefined`、または空配列は空配列として扱われます。

```typescript
import { unzip } from 'es-toolkit/compat';

unzip(null); // []
unzip(undefined); // []
unzip([]); // []
```

#### パラメータ

- `array` (`T[][] | ArrayLike<ArrayLike<T>> | null | undefined`): アンジップするネストした配列。各内部配列の同じ位置の要素が集められます。

#### 戻り値

(`T[][]`): 同じ位置の要素が集められた新しい配列を返します。
