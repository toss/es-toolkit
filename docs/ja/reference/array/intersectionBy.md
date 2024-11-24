# intersectionBy

`mapper` 関数が返す値を基準に、2つの配列の共通部分を返します。

この関数は、パラメータとして2つの配列と `mapper` 関数を受け取ります。
`mapper` 関数で各配列の要素を変換したとき、両方の配列に含まれる要素からなる新しい配列を返します。
実際の実装を見ると、最初の配列と2番目の配列を `mapper` が返す値を基準に比較し、最初の配列の要素のうち2番目の配列にない要素を除去します。

## インターフェース

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: U[], mapper: (item: T | U) => unknown): T[];
```

### パラメータ

- `firstArr` (`T[]`): 比較する最初の配列。
- `secondArr` (`U[]`): 比較する2番目の配列。
- `mapper` (`(item: T | U) => unknown`): 比較するために要素を新しい値に変換する関数。

### 戻り値

(`T[]`): 最初の配列と2番目の配列を `mapper` が返す値を基準に比較し、両方の配列に含まれる要素のみを含む新しい配列。

## 例

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// `mapper`で変換したとき、両方の配列に含まれる要素からなる [{ id: 2 }] 値が返されます。

const array1 = [
  { id: 1, name: 'jane' },
  { id: 2, name: 'amy' },
  { id: 3, name: 'michael' },
];
const array2 = [2, 4];
const mapper = item => (typeof item === 'object' ? item.id : item);
const result = intersectionBy(array1, array2, mapper);
// `mapper`で変換したとき、両方の配列に含まれる要素からなる [{ id: 2, name: 'amy' }] 値が返されます。
```

## Lodashとの互換性

`es-toolkit/compat`から`intersectionBy`をインポートすると、lodashと互換性があります。

- `intersectionBy`は共通要素を見つけるために複数の配列風オブジェクト(Array-like object)を受け入れます。
- `intersectionBy`はプロパティキーをiterateeとして受け入れます。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [1.2, 2.4, 3.6];
const array2 = [2.5, 3.7];
const array3 = [2.6, 3.8];
const result = intersectionBy(array1, array2, array3, Math.floor);
// 結果は [2.4, 3.6] です。Math.floorを適用した後、共通要素は2と3です。

const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
const result = intersectionBy(array1, array2, 'x');
// 結果は [{ x: 2 }, { x: 3 }] です。これらの要素は同じ`x`プロパティを持っています。

const arrayLike1 = { 0: 'apple', 1: 'banana', 2: 'cherry', length: 3 };
const arrayLike2 = { 0: 'banana', 1: 'cherry', 2: 'date', length: 3 };
const result = intersectionBy(arrayLike1, arrayLike2);
// 結果は ['banana', 'cherry'] です。これらの要素は両方の配列風オブジェクトに共通しています。
```
