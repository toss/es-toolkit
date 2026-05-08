# percentile

数値配列から指定されたパーセンタイルの値を計算します。

```typescript
const value = percentile(arr, p);
```

## インターフェース

```typescript
function percentile(arr: readonly number[], percentile: number): number;
```

### パラメータ

- `arr` (`readonly number[]`): パーセンタイルを計算する数値配列です。
- `percentile` (`number`): 計算するパーセンタイルです。`[0, 100]` の範囲の値である必要があります。

### 戻り値

(`number`): 指定されたパーセンタイルに対応する値を返します。空の配列の場合は `NaN` を返します。

### エラー

`percentile` が `NaN` の場合、`0` より小さい場合、または `100` より大きい場合は `Error` をスローします。

## 例

```typescript
import { percentile } from 'es-toolkit/math';

// 配列の中央値(50パーセンタイル)を返します
percentile([1, 2, 3, 4, 5], 50);
// 3を返します

// 75パーセンタイルを計算します
percentile([1, 2, 3, 4, 5], 75);
// 4を返します

// ソートされていない配列も自動的にソートします
percentile([50, 10, 30, 20, 40], 50);
// 30を返します

// 0パーセンタイルでは最小値を返します
percentile([5, 1, 4, 2, 3], 0);
// 1を返します

// 空の配列の場合はNaNを返します
percentile([], 50);
// NaNを返します
```
