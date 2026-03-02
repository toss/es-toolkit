# groupBy

キー生成関数に従って配列の要素をグループに分けた新しいオブジェクトを返します。

```typescript
const grouped = groupBy(arr, getKeyFromItem);
```

## 使用法

### `groupBy(arr, getKeyFromItem)`

配列の要素を特定の基準に従って分類したい場合は `groupBy` を使用してください。各要素からキーを生成する関数を提供すると、同じキーを持つ要素同士をまとめてオブジェクトとして返します。返されるオブジェクトの値は、各グループに属する要素の配列です。データをカテゴリ別に整理したり、グループ別の分析を行う際に便利です。

```typescript
import { groupBy } from 'es-toolkit/array';

// オブジェクトの配列をカテゴリ別にグループ化します。
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

const result = groupBy(items, item => item.category);
// 結果:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```

様々な基準でグループ化できます。

```typescript
import { groupBy } from 'es-toolkit/array';

// 文字列の長さ別にグループ化します。
const words = ['one', 'two', 'three', 'four', 'five'];
const byLength = groupBy(words, word => word.length);
// 結果: { 3: ['one', 'two'], 4: ['four', 'five'], 5: ['three'] }

// 偶数/奇数別にグループ化します。
const numbers = [1, 2, 3, 4, 5, 6];
const byParity = groupBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 結果: { odd: [1, 3, 5], even: [2, 4, 6] }
```

#### パラメータ

- `arr` (`T[]`): グループ化する配列です。
- `getKeyFromItem` (`(item: T, index: number, array: T[]) => K`): 各要素、インデックス、配列からキーを生成する関数です。

#### 戻り値

(`Record<K, T[]>`): キーに従って要素がグループ化されたオブジェクトを返します。
