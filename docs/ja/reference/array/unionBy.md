# unionBy

特定の関数で変換した値を基準に、2つの配列の一意な要素を含む新しい配列を作ります。

```typescript
const unified = unionBy(arr1, arr2, mapper);
```

## 使用法

### `unionBy(arr1, arr2, mapper)`

オブジェクト配列で特定のプロパティを基準に重複を除きたい場合は `unionBy` を使用してください。`mapper` 関数が返す値が同じであれば同一の要素として扱われます。

```typescript
import { unionBy } from 'es-toolkit/array';

// idを基準にオブジェクトの和集合を求めます。
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
unionBy(users1, users2, user => user.id);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

// 数値を3で割った余りを基準に和集合を求めます。
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
unionBy(nums1, nums2, x => x % 3);
// Returns: [1, 2, 3]
// 1 % 3 = 1, 2 % 3 = 2, 3 % 3 = 0で、
// 4 % 3 = 1, 5 % 3 = 2, 6 % 3 = 0なので、すべて重複します。
```

カスタム比較関数を使用して複雑な基準でも和集合を求められます。

```typescript
import { unionBy } from 'es-toolkit/array';

const products1 = [
  { category: 'electronics', price: 100 },
  { category: 'books', price: 20 },
];
const products2 = [
  { category: 'electronics', price: 150 },
  { category: 'toys', price: 30 },
];

// カテゴリを基準に和集合を求めます。
unionBy(products1, products2, product => product.category);
// Returns: [
//   { category: 'electronics', price: 100 },
//   { category: 'books', price: 20 },
//   { category: 'toys', price: 30 }
// ]
```

#### パラメータ

- `arr1` (`T[]`): 結合する最初の配列です。
- `arr2` (`T[]`): 結合する2番目の配列です。
- `mapper` (`(item: T) => U`): 各要素を比較する値に変換する関数です。

#### 戻り値

(`T[]`): `mapper` 関数が返した値を基準に重複が除かれた2つの配列の和集合を返します。
