# maxBy (`BigInt`)

配列の要素のうち、導出された`BigInt`の値が最も大きい要素を返します。

```typescript
const largest = maxBy(items, getValue);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `maxBy(items, getValue)`

比較したい`BigInt`がオブジェクトの中にあり、数値だけでなくオブジェクト全体を受け取りたい場合は `maxBy` を使用してください。各要素から値を取り出す関数を渡します。

```typescript
import { maxBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const richest = maxBy(accounts, account => account.balance);
console.log(richest); // { owner: 'bob', balance: 30n }
```

複数の要素が最大値で並んだ場合は、最初の要素が返されます。`getValue` はインデックスと配列全体も受け取ります。

```typescript
import { maxBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 30n };
const second = { id: 'b', score: 30n };
console.log(maxBy([first, second], item => item.score)); // { id: 'a', score: 30n }

// 要素とその位置の両方から導出した値で比較します
const rounds = [{ points: 5n }, { points: 5n }, { points: 5n }];
const best = maxBy(rounds, (round, index) => round.points * BigInt(index + 1));
console.log(best); // 3番目のラウンド。乗数が最も大きいため
```

空配列には返す要素がないため、エラーをスローします。

```typescript
import { maxBy } from 'es-toolkit/bigint';

maxBy([], () => 0n); // RangeError: Cannot find the maximum of an empty array.
```

#### パラメータ

- `items` (`readonly T[]`): 探索する要素の配列です。
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): 比較に使用する`BigInt`を返す関数です。

#### 戻り値

(`T`): 導出された`BigInt`が最も大きい要素を返します。複数の要素が並んだ場合は最初の要素を返します。

#### エラー

配列が空の場合、`RangeError`をスローします。
