# median

数値配列の中央値を計算する関数です。

中央値とは、配列をソートしたときに中央に位置する要素のことです。
配列に奇数個の要素がある場合は、中央にある要素を返します。
配列に偶数個の要素がある場合は、中央にある2つの要素の平均を返します。

空の配列が与えられた場合は、`NaN`を返します。

## インターフェース

```typescript
function median(nums: number[]): number;
```

### パラメータ

- `nums` (`number[]`): 中央値を計算する数値の配列です。

### 戻り値

(`number`): 配列内のすべての数値の中央値を返します。

## 例

```typescript
const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
const result = median(arrayWithOddNumberOfElements);
// resultは3になります。

const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
const result = median(arrayWithEvenNumberOfElements);
// resultは2.5になります。
```
