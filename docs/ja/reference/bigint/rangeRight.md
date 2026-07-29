# rangeRight (`BigInt`)

[range](./range.md)と同じ`BigInt`を降順で返します。

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end);
const numbers = rangeRight(start, end, step);
```

::: info

この関数は、他の数値型の類似関数との潜在的な競合を避けるため、`es-toolkit/bigint`から独占的に利用できます。

:::

## 使用法

### `rangeRight(end)`

終了値のすぐ手前から`0n`まで降順で数え上げたい場合は、引数1つの `rangeRight` を使用してください。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(4n)); // [3n, 2n, 1n, 0n]
console.log(rangeRight(0n)); // []
```

#### パラメータ

- `end` (`bigint`): 範囲の終了値(含まない)です。

#### 戻り値

(`bigint[]`): `end` のすぐ手前から`0n`までの`BigInt`の配列を返します。

### `rangeRight(start, end)`

`0n`以外の開始値まで降順で数え上げたい場合は、引数2つの `rangeRight` を使用してください。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(2n, 5n)); // [4n, 3n, 2n]
console.log(rangeRight(-3n, 0n)); // [-1n, -2n, -3n]
```

#### パラメータ

- `start` (`bigint`): 範囲の開始値(含む)です。
- `end` (`bigint`): 範囲の終了値(含まない)です。

#### 戻り値

(`bigint[]`): `end` のすぐ手前から `start` までの`BigInt`の配列を返します。

### `rangeRight(start, end, step)`

`1n`以外の間隔で数え上げたい場合は、引数3つの `rangeRight` を使用してください。返される値は、同じ引数を渡した `range` の結果を反転したものと完全に一致します。

```typescript
import { range, rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 10n, 2n)); // [8n, 6n, 4n, 2n, 0n]
console.log(rangeRight(5n, 0n, -1n)); // [1n, 2n, 3n, 4n, 5n]

// 常に同じ引数を渡したrangeの逆順になります
console.log(rangeRight(0n, 10n, 3n)); // [9n, 6n, 3n, 0n]
console.log(range(0n, 10n, 3n)); // [0n, 3n, 6n, 9n]
```

ステップが終了値から遠ざかる方向を向いている場合、生成される値はなく、空配列が返されます。

```typescript
import { rangeRight } from 'es-toolkit/bigint';

console.log(rangeRight(0n, 5n, -1n)); // []
```

#### パラメータ

- `start` (`bigint`): 範囲の開始値(含む)です。
- `end` (`bigint`): 範囲の終了値(含まない)です。
- `step` (`bigint`, オプション): 数え上げる間隔です。デフォルトは `1n` です。

#### 戻り値

(`bigint[]`): `range(start, end, step)` の値を降順で返します。

#### エラー

`step` が `0n` の場合、エラーをスローします。
