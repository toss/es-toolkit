# median (`BigInt`)

`BigInt`の配列の中央値を返します。

```typescript
const middle = median(numbers);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `median(nums)`

`BigInt`の集合の中央値を求めたい場合は `median` を使用してください。配列のコピーをソートし——元の配列は変更されません——中央にある値を返します。

```typescript
import { median } from 'es-toolkit/bigint';

const middle = median([1n, 2n, 3n, 4n, 5n]);
console.log(middle); // 3n

// 配列は事前にソートされている必要はありません
console.log(median([5n, 1n, 4n, 2n, 3n])); // 3n
```

配列の要素数が偶数の場合、中央の2つの値の平均が求められます。`BigInt`には小数部がないため、その平均は**0方向に切り捨て**られます。

```typescript
import { median } from 'es-toolkit/bigint';

// (2n + 3n) / 2n は2.5ではなく2nになります
console.log(median([1n, 2n, 3n, 4n])); // 2n

// (1n + 2n) / 2n は1nになります
console.log(median([1n, 2n])); // 1n

// 切り捨ては0方向に行われるため、-3nではなく-2nになります
console.log(median([-3n, -2n])); // -2n
```

`BigInt`には`NaN`がないため、「中央値がない」ことを表す`BigInt`は存在しません。そのため、空配列は代替値を返す代わりにエラーをスローします。

```typescript
import { median } from 'es-toolkit/bigint';

median([]); // RangeError: Cannot compute the median of an empty array.
```

#### パラメータ

- `nums` (`readonly bigint[]`): 中央値を計算する`BigInt`の配列です。

#### 戻り値

(`bigint`): 配列の中央値を返します。要素数が偶数の場合は、中央の2つの値の平均を0方向に切り捨てて返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
