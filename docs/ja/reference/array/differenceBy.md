# differenceBy

2つの配列の要素を変換関数で変換し、差集合を求めて新しい配列を返します。

```typescript
const result = differenceBy(firstArr, secondArr, mapper);
```

## 参照

### `differenceBy(firstArr, secondArr, mapper)`

2つの配列の要素を特定の基準で比較して差集合を求めたい場合は、`differenceBy` を使用してください。各要素を変換関数で変換した値を基準に比較し、最初の配列にのみ存在する要素を返します。

```typescript
import { differenceBy } from 'es-toolkit/array';

// オブジェクト配列で id を基準に差集合を求めます。
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
differenceBy(array1, array2, item => item.id);
// 戻り値: [{ id: 1 }, { id: 3 }]
// id が 2 の要素は両方の配列に存在するため除外されます。

// 異なる型の配列も比較できます。
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
differenceBy(objects, numbers, item => (typeof item === 'object' ? item.id : item));
// 戻り値: [{ id: 1 }, { id: 3 }]
```

文字列の長さを基準に差集合を求めることもできます。

```typescript
import { differenceBy } from 'es-toolkit/array';

const words1 = ['apple', 'banana', 'cherry'];
const words2 = ['kiwi', 'pear'];
differenceBy(words1, words2, word => word.length);
// 戻り値: ['banana', 'cherry']
// 'apple' は 'kiwi' や 'pear' と長さが同じなので除外されます。
```

#### パラメータ

- `firstArr` (`T[]`): 差集合を求める基準配列。
- `secondArr` (`U[]`): 最初の配列から除外する要素を含む配列。
- `mapper` (`(value: T | U) => unknown`): 両方の配列の要素をマッピングする関数。この関数が返す値を基準に要素を比較します。

#### 戻り値

(`T[]`): 変換された値を基準に、最初の配列にのみ存在する要素で構成された新しい配列。
