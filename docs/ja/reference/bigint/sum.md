# sum (`BigInt`)

`BigInt`の配列のすべての要素を足した合計を返します。

```typescript
const total = sum(numbers);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `sum(nums)`

`BigInt`を足し合わせたい場合は `sum` を使用してください。配列のすべての要素を足して合計を返します。

```typescript
import { sum } from 'es-toolkit/bigint';

// 基本的な合計
const numbers = [1n, 2n, 3n, 4n, 5n];
const total = sum(numbers);
console.log(total); // 15n

// 負の値と正の値が混在した合計
const values = [-10n, 5n, -3n, 8n];
const result = sum(values);
console.log(result); // 0n
```

空配列は `0n` を返すため、配列を分割してそれぞれの合計を足しても、全体の合計と常に同じ結果になります。

```typescript
import { sum } from 'es-toolkit/bigint';

const empty = sum([]);
console.log(empty); // 0n

const first = [1n, 2n];
const second = [3n, 4n];
console.log(sum(first) + sum(second) === sum([...first, ...second])); // true
```

`number`とは異なり、`BigInt`は値がどれほど大きくなっても正確なままです。そのため、最小通貨単位の金額、トークンの量、データベースの識別子などに適しています。

```typescript
import { sum } from 'es-toolkit/bigint';

// Number.MAX_SAFE_INTEGERをはるかに超えても正確です
const balances = [9007199254740993n, 9007199254740993n];
console.log(sum(balances)); // 18014398509481986n

// 最小通貨単位で保存された支払いの合計
const paymentsInCents = [129999n, 4550n, 87500n];
console.log(sum(paymentsInCents)); // 222049n
```

#### パラメータ

- `nums` (`readonly bigint[]`): 合計を計算する`BigInt`の配列です。

#### 戻り値

(`bigint`): 配列内のすべての`BigInt`の合計を返します。空配列の場合は `0n` を返します。
