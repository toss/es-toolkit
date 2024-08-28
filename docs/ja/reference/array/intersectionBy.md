# intersectionBy

`mapper` 関数が返す値を基準に、2つの配列の共通部分を返します。

この関数は、パラメータとして2つの配列と `mapper` 関数を受け取ります。
`mapper` 関数で各配列の要素を変換したとき、両方の配列に含まれる要素からなる新しい配列を返します。
実際の実装を見ると、最初の配列と2番目の配列を `mapper` が返す値を基準に比較し、最初の配列の要素のうち2番目の配列にない要素を除去します。

## インターフェース

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: T[], mapper: (item: T) => U): T[];
```

### パラメータ

- `firstArr` (`T[]`): 比較する最初の配列。
- `secondArr` (`T[]`): 比較する2番目の配列。
- `mapper` (`(item: T) => U`): 比較するために要素を新しい値に変換する関数。

### 戻り値

(`T[]`): 最初の配列と2番目の配列を `mapper` が返す値を基準に比較し、両方の配列に含まれる要素のみを含む新しい配列。

## 例

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// `mapper`で変換したとき、両方の配列に含まれる要素からなる [{ id: 2 }] 値が返されます。
```
