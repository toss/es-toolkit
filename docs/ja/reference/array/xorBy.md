# xorBy

与えられた関数で各要素を変換した値を基準に、2つの配列のいずれか一方にのみ存在する要素で新しい配列を作成します。

```typescript
const result = xorBy(arr1, arr2, mapper);
```

## 使用法

### `xorBy(arr1, arr2, mapper)`

2つの配列の要素を特定の基準で比較して対称差集合を求めたい場合は `xorBy` を使用してください。各要素をマッピング関数で変換した後、2つの配列のいずれか一方にのみ存在する要素で新しい配列を作成します。

```typescript
import { xorBy } from 'es-toolkit/array';

// オブジェクトのidで対称差集合を求めます。
xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], obj => obj.id);
// Returns: [{ id: 1 }, { id: 3 }]

// 文字列の長さで対称差集合を求めます。
xorBy(['apple', 'banana'], ['grape', 'cherry', 'apple'], str => str.length);
// Returns: [] (すべての長さが重複)
```

マッピング関数の結果が同じ要素は1つとして扱われます。

```typescript
import { xorBy } from 'es-toolkit/array';

xorBy([1, 2, 3, 4], [3, 4, 5, 6], n => n % 3);
// Returns: [] (すべての余りが重複)
```

#### パラメータ

- `arr1` (`readonly T[]`): 比較する最初の配列です。
- `arr2` (`readonly T[]`): 比較する2番目の配列です。
- `mapper` (`(item: T) => U`): 各要素を比較可能な値に変換する関数です。

#### 戻り値

(`T[]`): マッピング関数の結果を基準に計算された対称差集合を表す新しい配列を返します。
