# mean

数値配列の平均を計算する関数です。空の配列に対しては `NaN` を返します。

## インターフェース

```typescript
function mean(nums: number[]): number;
```

### パラメータ

- `nums` (`number[]`): 平均を計算する数値の配列です。

### 戻り値

(`number`): 配列内のすべての数値の平均を返します。

## 例

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// resultは3になります。
```
