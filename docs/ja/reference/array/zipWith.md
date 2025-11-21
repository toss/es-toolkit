# zipWith

複数の配列をユーザー定義関数で結合して新しい配列を作成します。

```typescript
const result = zipWith(...arrs, combine);
```

## 使用法

### `zipWith(...arrs, combine)`

複数の配列の同じ位置の要素を希望する方法で結合したい場合は `zipWith` を使用してください。各配列の同じインデックスの要素を結合関数に渡して、その結果で新しい配列を作成します。

```typescript
import { zipWith } from 'es-toolkit/array';

// 2つの数値配列を足します。
zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// 文字列を結合します。
zipWith(['a', 'b'], ['c', 'd'], ['e', 'f'], (a, b, c) => `${a}${b}${c}`);
// Returns: ['ace', 'bdf']
```

配列の長さが異なる場合、最も長い配列の長さに合わせられます。短い配列の空の位置は `undefined` として渡されます。

```typescript
import { zipWith } from 'es-toolkit/array';

zipWith([1, 2], [10, 20, 30], (a, b) => (a ?? 0) + (b ?? 0));
// Returns: [11, 22, 30]
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): 結合する配列です。
- `combine` (`(...items: T[]) => R`): 各配列の対応するインデックスの要素を受け取って新しい値を返す関数です。

#### 戻り値

(`R[]`): 結合関数を適用した結果で構成された新しい配列を返します。
