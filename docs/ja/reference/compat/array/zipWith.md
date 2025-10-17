# zipWith (Lodash互換)

::: warning `es-toolkit`の[zipWith](../../array/zipWith.md)を使用してください

この`zipWith`関数はLodash互換性のための追加処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[zipWith](../../array/zipWith.md)を使用してください。

:::

複数の配列の要素を結合関数を使用して新しい配列に結合します。

```typescript
const result = zipWith([1, 2], [3, 4], (a, b) => a + b);
// resultは[4, 6]になります。
```

## 参照

### `zipWith(...arrs, iteratee)`

複数の配列を受け取り、各インデックスの要素を提供された関数で結合して新しい配列を作成します。配列の長さが異なる場合、最も長い配列の長さまで処理し、欠落した値には`undefined`が渡されます。

```typescript
import { zipWith } from 'es-toolkit/compat';

// 2つの配列の要素を足す
const result1 = zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// 戻り値: [5, 7, 9]

// 3つの配列の要素を結合
const result2 = zipWith([1, 2], [3, 4], [5, 6], (a, b, c) => a + b + c);
// 戻り値: [9, 12]

// 長さが異なる配列
const result3 = zipWith([1, 2, 3], [4, 5], (a, b) => (a || 0) + (b || 0));
// 戻り値: [5, 7, 3]
```

#### パラメータ

- `...arrs` (`any[][]`): 結合する配列。
- `iteratee` (`Function`): 各インデックスの要素を結合する関数。

#### 戻り値

(`any[]`): 結合関数を適用した結果からなる新しい配列。
