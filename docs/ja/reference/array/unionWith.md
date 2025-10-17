# unionWith

カスタム等価関数を基準に、2つの配列の一意な要素を含む新しい配列を作ります。

```typescript
const unified = unionWith(arr1, arr2, areItemsEqual);
```

## 参照

### `unionWith(arr1, arr2, areItemsEqual)`

複雑な条件で要素の等価性を判断したい場合は `unionWith` を使用してください。提供された関数が真を返すと2つの要素を同じものと判断して重複を除きます。

```typescript
import { unionWith } from 'es-toolkit/array';

// オブジェクトのidを基準に和集合を求めます。
const array1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const array2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const areItemsEqual = (a, b) => a.id === b.id;
unionWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

より複雑な比較ロジックも使用できます。

```typescript
import { unionWith } from 'es-toolkit/array';

// 座標を基準に和集合を求めます。
const points1 = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
];
const points2 = [
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
unionWith(points1, points2, arePointsEqual);
// Returns: [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }]
```

大文字小文字を無視した文字列比較の例です。

```typescript
import { unionWith } from 'es-toolkit/array';

const words1 = ['Apple', 'banana'];
const words2 = ['BANANA', 'orange'];
const areWordsEqual = (a, b) => a.toLowerCase() === b.toLowerCase();
unionWith(words1, words2, areWordsEqual);
// Returns: ['Apple', 'orange']
// 'banana'と'BANANA'は同じものと判断され、最初の配列の'Apple'だけが残ります。
```

#### パラメータ

- `arr1` (`T[]`): 結合する最初の配列です。
- `arr2` (`T[]`): 結合する2番目の配列です。
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 2つの要素が同じかを判断する関数です。同じと判断されれば `true` を、そうでなければ `false` を返す必要があります。

#### 戻り値

(`T[]`): カスタム等価関数を基準に重複が除かれた2つの配列の和集合を返します。
