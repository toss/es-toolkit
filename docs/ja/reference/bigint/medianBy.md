# medianBy (`BigInt`)

配列の各要素から関数が導出した`BigInt`の中央値を返します。

```typescript
const middle = medianBy(items, getValue);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `medianBy(items, getValue)`

中央値を求めたい`BigInt`がオブジェクトの中にある場合は `medianBy` を使用してください。各要素から値を取り出す関数を渡すと、その関数が返すすべての値の中央値を求めます。

```typescript
import { medianBy } from 'es-toolkit/bigint';

const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];
const middle = medianBy(accounts, account => account.balance);
console.log(middle); // 20n
```

`median` と同様に、要素数が偶数の場合は中央の2つの値の平均を0方向に切り捨て、空配列の場合はエラーをスローします。

```typescript
import { medianBy } from 'es-toolkit/bigint';

const payments = [{ amount: 1n }, { amount: 2n }, { amount: 3n }, { amount: 4n }];
console.log(medianBy(payments, payment => payment.amount)); // 2n

medianBy([], () => 0n); // RangeError: Cannot compute the median of an empty array.
```

#### パラメータ

- `items` (`readonly T[]`): 中央値を計算する要素の配列です。
- `getValue` (`(element: T) => bigint`): 各要素に対して使用する`BigInt`を返す関数です。

#### 戻り値

(`bigint`): `getValue` が返したすべての値の中央値を返します。要素数が偶数の場合は、中央の2つの値の平均を0方向に切り捨てて返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
