# intersectionWith

ユーザー定義比較関数を基準に、2つの配列の交集合を求めた新しい配列を返します。

```typescript
const result = intersectionWith(firstArr, secondArr, areItemsEqual);
```

## 参照

### `intersectionWith(firstArr, secondArr, areItemsEqual)`

2つの配列でユーザーが定義した比較関数により共通要素を見つけたい場合は `intersectionWith` を使用してください。単純な値比較では処理しづらい複雑なオブジェクトや、特殊な比較ロジックが必要な場合に便利です。

```typescript
import { intersectionWith } from 'es-toolkit/array';

// オブジェクトのidプロパティで比較します。
const users1 = [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }];
const users2 = [{ id: 2, name: 'jane' }, { id: 3, name: 'bob' }];
intersectionWith(users1, users2, (a, b) => a.id === b.id);
// Returns: [{ id: 2, name: 'jane' }]

// 異なる型同士も比較できます。
const objects = [{ id: 1, name: 'apple' }, { id: 2, name: 'banana' }];
const ids = [2, 3];
intersectionWith(objects, ids, (obj, id) => obj.id === id);
// Returns: [{ id: 2, name: 'banana' }]
```

複雑な比較ロジックも実装できます。

```typescript
import { intersectionWith } from 'es-toolkit/array';

// 大文字小文字を区別しない文字列比較
const words1 = ['Apple', 'Banana'];
const words2 = ['apple', 'cherry'];
intersectionWith(words1, words2, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Apple']

// 範囲内の数値比較
const numbers1 = [1.1, 2.3, 3.7];
const numbers2 = [1.0, 2.5, 4.0];
intersectionWith(numbers1, numbers2, (a, b) => Math.abs(a - b) < 0.5);
// Returns: [1.1] (1.1と1.0の差が0.5未満)
```

#### パラメータ

- `firstArr` (`readonly T[]`): 比較する最初の配列です。
- `secondArr` (`readonly U[]`): 比較する2番目の配列です。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 2つの要素が等しいかを判断する関数です。等しい場合は `true`、異なる場合は `false` を返す必要があります。

#### 戻り値

(`T[]`): ユーザー定義比較関数を基準に、両方の配列に共通して含まれる要素からなる新しい配列を返します。結果は最初の配列の要素で構成されます。
