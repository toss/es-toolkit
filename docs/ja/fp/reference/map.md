# map

配列のすべての要素を変換するデータラストな演算子を作成します。`Array.prototype.map` と同等です。

```typescript
const result = pipe(array, map(callbackfn));
```

## 使用法

`map` は各要素に対して `callbackfn` を呼び出し、新しい配列を作成します。これは **遅延評価に対応** しています。[`pipe`](/ja/fp/reference/pipe) の中では隣接する遅延演算子と融合されるため、末尾の `take` によって処理を早期に止められます。

```typescript
import { map, pipe } from 'es-toolkit/fp';

// 各要素を変換します。
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// インデックスは第 2 引数として利用できます。
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// 要素の型を変えられます。
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### パラメータ

- `callbackfn` (`(value: T, index: number, array: readonly T[]) => U`): 各要素に対して呼び出される関数です。その戻り値が出力配列の対応する要素になります。遅延評価の間、`array` にはそれまでに処理した要素だけが含まれます。

#### 戻り値

(`(array: readonly T[]) => U[]`): `readonly T[]` を新しい `U[]` に変換するデータラストな演算子です。
