# range (`BigInt`)

開始値から終了値の手前までを数え上げた`BigInt`の配列を返します。

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `range(end)`

`0n`から終了値の手前までを数え上げたい場合は、引数1つの `range` を使用してください。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(4n)); // [0n, 1n, 2n, 3n]
console.log(range(0n)); // []
```

#### パラメータ

- `end` (`bigint`): 範囲の終了値(含まない)です。

#### 戻り値

(`bigint[]`): `0n`から `end` の手前までの`BigInt`の配列を返します。

### `range(start, end)`

`0n`ではなく指定した開始値から数え上げたい場合は、引数2つの `range` を使用してください。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(2n, 5n)); // [2n, 3n, 4n]
console.log(range(-3n, 0n)); // [-3n, -2n, -1n]

// 開始値と終了値が同じ場合、数え上げる値はありません
console.log(range(3n, 3n)); // []
```

`BigInt`はどれほど大きな値でも正確なままなので、値が知らないうちに衝突することなく`Number.MAX_SAFE_INTEGER`を超える範囲を作成できます。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(9007199254740993n, 9007199254740996n));
// [9007199254740993n, 9007199254740994n, 9007199254740995n]
```

#### パラメータ

- `start` (`bigint`): 範囲の開始値(含む)です。
- `end` (`bigint`): 範囲の終了値(含まない)です。

#### 戻り値

(`bigint[]`): `start` から `end` の手前までの`BigInt`の配列を返します。

### `range(start, end, step)`

`1n`以外の間隔で数え上げたい場合は、引数3つの `range` を使用してください。負のステップを指定すると降順で数え上げます。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 10n, 2n)); // [0n, 2n, 4n, 6n, 8n]
console.log(range(5n, 0n, -1n)); // [5n, 4n, 3n, 2n, 1n]
console.log(range(5n, 0n, -2n)); // [5n, 3n, 1n]
```

ステップが終了値から遠ざかる方向を向いている場合、生成される値はなく、空配列が返されます。

```typescript
import { range } from 'es-toolkit/bigint';

console.log(range(0n, 5n, -1n)); // []
console.log(range(5n, 0n, 1n)); // []
```

#### パラメータ

- `start` (`bigint`): 範囲の開始値(含む)です。
- `end` (`bigint`): 範囲の終了値(含まない)です。
- `step` (`bigint`, オプション): 数え上げる間隔です。デフォルトは `1n` です。

#### 戻り値

(`bigint[]`): `start` から `end` の手前までを `step` 間隔で数え上げた`BigInt`の配列を返します。

#### エラー

`step` が `0n` の場合、エラーをスローします。
