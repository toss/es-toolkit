# intersectionWith

2つの要素が一致するかどうかを判断するカスタム関数を基準に、2つの配列の交差部分を返します。

この関数は、パラメータとして2つの配列とカスタム一致関数を受け取ります。
この関数は、カスタム一致関数の戻り値を基準に、両方の配列に含まれる要素を新しい配列として返します。
実際の実装を見ると、最初の配列の要素のうち、2番目の配列のどの要素とも一致関数の基準で等しくない要素を除外した新しい配列を返します。

## インターフェース

```typescript
function intersectionWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[];
```

### パラメータ

- `firstArr` (`T[]`): 比較する最初の配列。
- `secondArr` (`T[]`): 比較する2番目の配列。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が一致するかどうかを判断する一致関数です。2つの要素が一致する場合は `true` を、一致しない場合は `false` を返すようにしてください。

### 戻り値

(`T[]`): カスタム一致関数の戻り値を基準に、両方の配列に含まれる要素を含む新しい配列。

## 例

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = intersectionWith(array1, array2, areItemsEqual);
// `areItemsEqual` 基準でarray1とarray2の両方に含まれている要素からなる [{ id: 2 }] が返されます。
```
