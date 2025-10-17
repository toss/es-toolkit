# union

2つの配列のすべての一意な要素を含む新しい配列を作ります。

```typescript
const unified = union(arr1, arr2);
```

## 参照

### `union(arr1, arr2)`

複数の配列から重複なくすべての要素を1つにまとめたい場合は `union` を使用してください。2つの配列を合わせた後、重複した値を除いた新しい配列を返します。

```typescript
import { union } from 'es-toolkit/array';

// 数値配列の和集合を求めます。
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
union(array1, array2);
// Returns: [1, 2, 3, 4, 5]

// 文字列配列の和集合を求めます。
const fruits1 = ['apple', 'banana'];
const fruits2 = ['banana', 'orange'];
union(fruits1, fruits2);
// Returns: ['apple', 'banana', 'orange']
```

最初の配列の要素が先に現れ、その次に2番目の配列の一意な要素が追加されます。

```typescript
import { union } from 'es-toolkit/array';

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];
union(arr1, arr2);
// Returns: [1, 2, 3, 4, 5]
// 1, 2, 3はarr1から、4, 5はarr2から来た要素です。
```

#### パラメータ

- `arr1` (`T[]`): 結合する最初の配列です。
- `arr2` (`T[]`): 結合する2番目の配列です。

#### 戻り値

(`T[]`): 2つの配列のすべての一意な要素を含む新しい配列を返します。
