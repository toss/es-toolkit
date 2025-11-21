# intersection

両方の配列に共通して含まれる要素からなる新しい配列を返します。

```typescript
const result = intersection(firstArr, secondArr);
```

## 使用法

### `intersection(firstArr, secondArr)`

2つの配列で共通の要素のみを見つけたい場合は `intersection` を使用してください。最初の配列の要素の中から、2番目の配列にも存在するものだけを新しい配列として返します。2つのデータセットの交集合を求める際に便利です。

```typescript
import { intersection } from 'es-toolkit/array';

// 数値配列の交集合を求めます。
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
intersection(numbers1, numbers2);
// Returns: [3, 4, 5]

// 文字列配列の交集合を求めます。
const strings1 = ['apple', 'banana', 'cherry'];
const strings2 = ['banana', 'cherry', 'date'];
intersection(strings1, strings2);
// Returns: ['banana', 'cherry']
```

交集合がない場合や特別なケースも処理します。

```typescript
import { intersection } from 'es-toolkit/array';

// 交集合がない場合は空の配列を返します。
const noCommon1 = [1, 2, 3];
const noCommon2 = [4, 5, 6];
intersection(noCommon1, noCommon2);
// Returns: []

// 一方が空の配列の場合も空の配列を返します。
const numbers = [1, 2, 3];
const empty: number[] = [];
intersection(numbers, empty);
// Returns: []
```

#### パラメータ

- `firstArr` (`readonly T[]`): 比較する最初の配列です。
- `secondArr` (`readonly T[]`): 比較する2番目の配列です。

#### 戻り値

(`T[]`): 両方の配列に共通して含まれる要素からなる新しい配列を返します。
