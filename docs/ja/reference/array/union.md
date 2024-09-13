# union

2つの配列を結合し、重複した値を除いた和集合を返します。

## インターフェース

```typescript
function union<T>(arr1: T[], arr2: T[]): T[];
```

### パラメータ

- `arr1` (`T[]`): 結合する1つ目の配列。
- `arr2` (`T[]`): 結合する2つ目の配列。

### 戻り値

(`T[]`): 結合され、重複した値が除かれた新しい配列。

## 例

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// resultは [1, 2, 3, 4, 5] になります。
```
