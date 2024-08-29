# intersection

両方の配列に含まれる要素を返します。

この関数は2つの配列を受け取り、両方の配列に含まれる要素で構成された新しい配列を返します。
実際には、最初の配列の要素のうち、2番目の配列に含まれていない要素を削除します。

## インターフェース

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### パラメータ

- `firstArr` (`T[]`): 比較する1つ目の配列。
- `secondArr` (`T[]`): 比較する2つ目の配列。

### 戻り値

(`T[]`) 両方の配列に含まれる要素で構成された新しい配列。

## 例

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 両方の配列に含まれる [3, 4, 5] を返します。
```
