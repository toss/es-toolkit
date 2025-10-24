# xor

2つの配列のいずれか一方にのみ存在する要素で新しい配列を作成します。

```typescript
const result = xor(arr1, arr2);
```

## 参照

### `xor(arr1, arr2)`

2つの配列の対称差集合を求めたい場合は `xor` を使用してください。2つの配列のいずれか一方にのみ存在し、交差しない要素で構成された新しい配列を返します。

```typescript
import { xor } from 'es-toolkit/array';

// 数値配列の対称差集合を求めます。
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// 文字列配列の対称差集合を求めます。
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']
```

重複する要素は自動的に削除されます。

```typescript
import { xor } from 'es-toolkit/array';

xor([1, 2, 2, 3], [3, 4, 4, 5]);
// Returns: [1, 2, 4, 5]
```

#### パラメータ

- `arr1` (`readonly T[]`): 比較する最初の配列です。
- `arr2` (`readonly T[]`): 比較する2番目の配列です。

#### 戻り値

(`T[]`): 2つの配列の対称差集合を表す新しい配列を返します。
