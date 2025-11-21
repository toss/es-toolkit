# intersectionBy

変換関数の結果を基準に、2つ以上の配列の共通部分を返します。

```typescript
const result = intersectionBy(firstArr, secondArr, ...otherArr, mapper);
```

## 使用法

### `intersectionBy(firstArr, secondArr, ...otherArr?, mapper)`

特定のプロパティや変換された値を基準に、2つ以上の配列から共通要素を見つけたい場合は`intersectionBy`を使用してください。各要素に変換関数を適用した結果を比較して共通部分を計算します。オブジェクト配列を特定のプロパティで比較する場合や、複雑な変換ロジックが必要な場合に便利です。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// オブジェクトのidプロパティを基準に交集合を求めます。
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 4, name: 'alice' },
];
intersectionBy(users1, users2, user => user.id);
// Returns: [{ id: 2, name: 'jane' }]

// 異なる型の配列も比較できます。
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3, 4];
intersectionBy(objects, ids, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 2, name: 'banana' }]
```

複雑な変換ロジックも適用できます。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 文字列を小文字に変換して比較します。
const words1 = ['Apple', 'Banana', 'Cherry'];
const words2 = ['apple', 'DATE', 'elderberry'];
intersectionBy(words1, words2, word => word.toLowerCase());
// Returns: ['Apple']

// 数値を絶対値に変換して比較します。
const numbers1 = [1, -2, 3, -4];
const numbers2 = [2, -3, 4, 5];
intersectionBy(numbers1, numbers2, num => Math.abs(num));
// Returns: [-2, 3, -4]
```

3つ以上の配列も比較できます。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 3つの配列すべてに存在する要素を見つける
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }];
const arr3 = [{ id: 2 }, { id: 4 }];
intersectionBy(arr1, arr2, arr3, item => item.id);
// Returns: [{ id: 2 }, { id: 3 }]
```

#### パラメータ

- `firstArr` (`readonly T[]`): 比較する最初の配列です。
- `secondArr` (`readonly U[]`): 比較する2番目の配列です。
- `...otherArr` (`readonly U[]`, オプション): 比較する追加の配列。
- `mapper` (`(item: T | U) => unknown`): 各要素を変換して比較基準を作成する関数です。

#### 戻り値

(`T[]`): 変換された値を基準に、すべての配列に存在する最初の配列の要素を含む新しい配列を返します。結果は最初の配列の要素で構成されます。
