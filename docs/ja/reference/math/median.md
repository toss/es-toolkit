# median

数値配列の中央値を計算する関数です。

空の配列に対しては `NaN` を返します。
配列の要素数が奇数の場合、中央の要素を返します。
配列の要素数が偶数の場合、中央の2つの要素の平均を返します。

## インターフェース

```typescript
function median(nums: readonly number[]): number;
```

### パラメータ

- `nums` (`readonly number[]`): 中央値を計算する数値の配列です。

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
