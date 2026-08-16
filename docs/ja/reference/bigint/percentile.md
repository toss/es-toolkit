# percentile (`BigInt`)

配列の指定されたパーセンタイルに位置する`BigInt`を返します。

```typescript
const value = percentile(numbers, 90);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `percentile(arr, percentile)`

データの一定の割合がその値以下に収まる境界の値——たとえばp90レイテンシ——を知りたい場合は `percentile` を使用してください。配列のコピーをソートし——元の配列は変更されません——対応する順位の値を選びます。

```typescript
import { percentile } from 'es-toolkit/bigint';

const latencies = [1n, 2n, 3n, 4n, 5n];

console.log(percentile(latencies, 50)); // 3n
console.log(percentile(latencies, 90)); // 5n

// 配列は事前にソートされている必要はありません
console.log(percentile([30n, 10n, 20n], 50)); // 20n
```

この関数は[最近順位法(nearest-rank method)](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method)を使用するため、結果は必ず配列にすでに存在する値になります。2つの値の間を補間することはないので、丸めが発生することもありません。

```typescript
import { percentile } from 'es-toolkit/bigint';

// 1nと2nの中間は1.5になりますが、BigIntでは表現できないため、
// 代わりに最近順位の値が返されます。
console.log(percentile([1n, 2n], 50)); // 1n

// 0は常に最小値を、100は常に最大値を返します
console.log(percentile([5n, 1n, 3n], 0)); // 1n
console.log(percentile([5n, 1n, 3n], 100)); // 5n
```

パーセンタイル自体は測定対象の量ではなく百分率であるため、`BigInt`ではなく`0`から`100`までの通常の`number`です。

```typescript
import { percentile } from 'es-toolkit/bigint';

percentile([1n, 2n, 3n], 101); // Error: Expected percentile to be <= 100 but got "101".
percentile([], 50); // RangeError: Cannot compute the percentile of an empty array.
```

#### パラメータ

- `arr` (`readonly bigint[]`): パーセンタイルを計算する`BigInt`の配列です。
- `percentile` (`number`): 求めるパーセンタイルで、`0`から`100`までの値です。

#### 戻り値

(`bigint`): 指定されたパーセンタイルに位置する`BigInt`を返します。必ず配列にすでに存在する値のいずれかです。

#### エラー

`percentile` が`NaN`、`0`未満、または`100`を超える場合、エラーをスローします。配列が空の場合、`RangeError`をスローします。
