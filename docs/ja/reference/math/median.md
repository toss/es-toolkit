# median

数値配列の中央値を計算します。

```typescript
const middle = median(nums);
```

## 使用法

### `median(nums)`

数値配列の中央値を求めたい場合は `median` を使用してください。配列を昇順に並び替えた後、真ん中に位置する値を見つけます。奇数個の要素を持つ配列の場合は正確に真ん中の値を、偶数個の要素を持つ配列の場合は真ん中の2つの値の平均を返します。空の配列が与えられた場合は `NaN` を返します。

```typescript
import { median } from 'es-toolkit/math';

// 奇数個の要素がある配列の中央値を計算します
const oddNumbers = [1, 2, 3, 4, 5];
const oddResult = median(oddNumbers);
// oddResultは3になります (ソートされた配列 [1, 2, 3, 4, 5] の真ん中の値)

// 偶数個の要素がある配列の中央値を計算します
const evenNumbers = [1, 2, 3, 4];
const evenResult = median(evenNumbers);
// evenResultは2.5になります ((2 + 3) / 2 = 2.5)

// ソートされていない配列も自動的にソートします
const unordered = [3, 1, 4, 1, 5];
const unorderedResult = median(unordered);
// unorderedResultは3になります (ソート後 [1, 1, 3, 4, 5] の真ん中の値)

// 空の配列の場合はNaNを返します
const emptyResult = median([]);
// emptyResultはNaNになります
```

#### パラメータ

- `nums` (`readonly number[]`): 中央値を計算する数値配列です。

#### 戻り値

(`number`): 配列内のすべての数値の中央値を返します。空の配列の場合は `NaN` を返します。
