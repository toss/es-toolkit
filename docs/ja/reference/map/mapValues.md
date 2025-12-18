# mapValues (`Map`)

提供された関数で値を変換し、キーは同じままの新しいMapを作成します。

```typescript
const transformed = mapValues(map, getNewValue);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `mapValues(map, getNewValue)`

Mapの値を変換しながらキーを変更せずに保持したい場合は `mapValues` を使用してください。各エントリから新しい値を生成する関数を提供すると、変換された値を持つ新しいMapを返します。

```typescript
import { mapValues } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapValues(map, value => value * 2);
// 結果:
// Map(3) {
//   'a' => 2,
//   'b' => 4,
//   'c' => 6
// }
```

様々な方法で値を変換できます。

```typescript
import { mapValues } from 'es-toolkit/map';

// 値をフォーマットします。
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

const formatted = mapValues(prices, value => `$${value.toFixed(2)}`);
// 結果: '$1.50', '$0.75', '$2.00'の値を持つMap

// キーに基づいて変換します。
const inventory = new Map([
  ['premium_item', 10],
  ['standard_item', 20],
  ['basic_item', 30],
]);

const adjusted = mapValues(inventory, (value, key) =>
  key.startsWith('premium_') ? value * 1.5 : value
);
// 結果: 15, 20, 30の値を持つMap
```

#### パラメータ

- `map` (`Map<K, V>`): 変換するMapです。
- `getNewValue` (`(value: V, key: K, object: Map<K, V>) => V`): 値とキーのペアから新しい値を生成する関数です。

#### 戻り値

(`Map<K, V>`): 同じキーと変換された値を持つ新しいMapを返します。
