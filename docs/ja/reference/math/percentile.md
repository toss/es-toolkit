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

## 仕組み

配列を昇順にソートした後、次の位置にある要素を返します。

```typescript
const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
return sorted[index];
```

これは **nearest-rank**(最近順位)方式です。配列の長さに `percentile / 100` を掛けると 1 始まりの順位(rank)が得られます。`Math.ceil` で切り上げることで、要求された割合以上を含む最小の順位が選ばれ、`1` を引いて 0 始まりの配列インデックスに変換します。

例えば、長さ 100 のソート済み配列で `percentile = 75` の場合:

- `Math.ceil(100 * 0.75) - 1` → `74`
- 75 番目に小さい値(`sorted[74]`)を返します。

`percentile = 0` は上記の式だと `-1` になってしまうため、特別扱いして最小値を返します。

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
