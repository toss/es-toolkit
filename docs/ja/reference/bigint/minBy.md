# minBy (`BigInt`)

配列の要素のうち、導出された`BigInt`の値が最も小さい要素を返します。

```typescript
const smallest = minBy(items, getValue);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `minBy(items, getValue)`

比較したい`BigInt`がオブジェクトの中にあり、数値だけでなくオブジェクト全体を受け取りたい場合は `minBy` を使用してください。各要素から値を取り出す関数を渡します。

```typescript
import { minBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const poorest = minBy(accounts, account => account.balance);
console.log(poorest); // { owner: 'alice', balance: 10n }
```

複数の要素が最小値で並んだ場合は、最初の要素が返されます。`getValue` はインデックスと配列全体も受け取ります。

```typescript
import { minBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 10n };
const second = { id: 'b', score: 10n };
console.log(minBy([first, second], item => item.score)); // { id: 'a', score: 10n }
```

空配列には返す要素がないため、エラーをスローします。

```typescript
import { minBy } from 'es-toolkit/bigint';

minBy([], () => 0n); // RangeError: Cannot find the minimum of an empty array.
```

#### パラメータ

- `items` (`readonly T[]`): 探索する要素の配列です。
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): 比較に使用する`BigInt`を返す関数です。

#### 戻り値

(`T`): 導出された`BigInt`が最も小さい要素を返します。複数の要素が並んだ場合は最初の要素を返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
