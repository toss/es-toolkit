# percentile

数値配列から指定されたパーセンタイルの値を計算します。

`percentile` 関数は配列を昇順にソートし、最も近い順位の要素を返します ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method))。

```typescript
const value = percentile(arr, p);
```

## 使用法

### `percentile(arr, percentile)`

数値配列から特定のパーセンタイルに対応する値を求めたい場合は `percentile` を使用してください。例えば、50パーセンタイルは中央値であり、75パーセンタイルはデータ全体の75%がその値以下になる位置です。

```typescript
import { percentile } from 'es-toolkit/math';

// 配列の中央値(50パーセンタイル)を求めます
const median = percentile([1, 2, 3, 4, 5], 50); // medianは3になります

// 75パーセンタイルを求めます
const p75 = percentile([1, 2, 3, 4, 5], 75); // p75は4になります

// ソートされていない配列も自動的にソートします
const result = percentile([50, 10, 30, 20, 40], 50); // resultは30になります

// 0パーセンタイルは最小値を返します
const min = percentile([5, 1, 4, 2, 3], 0); // minは1になります

// 空の配列の場合はNaNを返します
const empty = percentile([], 50); // emptyはNaNになります
```

#### パラメータ

- `arr` (`readonly number[]`): パーセンタイルを計算する数値配列です。
- `percentile` (`number`): 計算するパーセンタイルです。`[0, 100]` の範囲の値である必要があります。

#### 戻り値

(`number`): 指定されたパーセンタイルに対応する値を返します。空の配列の場合は `NaN` を返します。

#### エラー

`percentile` が `NaN` の場合、`0` より小さい場合、または `100` より大きい場合は、エラーをスローします。
