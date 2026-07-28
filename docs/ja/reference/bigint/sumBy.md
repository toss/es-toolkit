# sumBy (`BigInt`)

配列の各要素から関数が導出した`BigInt`の合計を返します。

```typescript
const total = sumBy(items, getValue);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `sumBy(items, getValue)`

足し合わせたい`BigInt`がオブジェクトの中にある場合は `sumBy` を使用してください。各要素から値を取り出す関数を渡すと、その関数が返すすべての値を足し合わせます。

```typescript
import { sumBy } from 'es-toolkit/bigint';

// 各オブジェクトのフィールドを合計します
const accounts = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];
const total = sumBy(accounts, account => account.balance);
console.log(total); // 60n

// インデックスは2番目の引数として渡されます
const weights = sumBy(['a', 'b', 'c'], (_, index) => BigInt(index));
console.log(weights); // 3n
```

空配列は `0n` を返し、値は負の数でもかまいません。

```typescript
import { sumBy } from 'es-toolkit/bigint';

console.log(sumBy([], () => 1n)); // 0n

const entries = [{ amount: -500n }, { amount: 1200n }, { amount: -200n }];
console.log(sumBy(entries, entry => entry.amount)); // 500n
```

#### パラメータ

- `items` (`readonly T[]`): 合計を計算する要素の配列です。
- `getValue` (`(element: T, index: number) => bigint`): 各要素に対して加算する`BigInt`を返す関数です。

#### 戻り値

(`bigint`): `getValue` が返したすべての値の合計を返します。空配列の場合は `0n` を返します。
