# unionWith

2つの要素が一致するかどうかを判断するカスタム関数を基準に、2つの配列の和集合を返します。

この関数は、パラメータとして2つの配列とカスタム一致関数を受け取ります。
この関数は、2つの配列を結合した後、カスタム一致関数の戻り値を基準に重複した要素を除去した新しい配列を返します。

## インターフェース

```typescript
function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### パラメータ

- `arr1` (`T[]`): 比較する最初の配列。
- `arr2` (`T[]`): 比較する2番目の配列。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が一致するかどうかを判断する一致関数です。2つの要素が一致する場合は `true` を、一致しない場合は `false` を返すようにしてください。

### 戻り値

(`T[]`): カスタム一致関数の戻り値を基準に、2つの配列の和集合を表す新しい配列。

## 例

```typescript
const array1 = [{ id: 1 }, { id: 2 }];
const array2 = [{ id: 2 }, { id: 3 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = unionWith(array1, array2, areItemsEqual);
// 結果は [{ id: 1 }, { id: 2 }, { id: 3 }] になります。{ id: 2 } は両方の配列に含まれているためです。
```
