# filter (`Map`)

述語関数に基づいてMapをフィルタリングします。

```typescript
const filtered = filter(map, callback);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `filter(map, callback)`

特定の条件を満たすエントリのみを含む新しいMapを作成したい場合は `filter` を使用してください。各エントリをテストする述語関数を提供すると、述語がtrueを返すエントリのみで構成された新しいMapを返します。

```typescript
import { filter } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
]);

const result = filter(map, value => value > 2);
// 結果:
// Map(2) {
//   'c' => 3,
//   'd' => 4
// }
```

様々な基準でフィルタリングできます。

```typescript
import { filter } from 'es-toolkit/map';

// 値の型でフィルタリングします。
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 0, inStock: false }],
  ['orange', { quantity: 5, inStock: true }],
]);

const inStockItems = filter(inventory, item => item.inStock);
// 結果: 'apple'と'orange'のエントリを含むMap

// キーのパターンでフィルタリングします。
const data = new Map([
  ['user_1', 'Alice'],
  ['admin_1', 'Bob'],
  ['user_2', 'Charlie'],
]);

const users = filter(data, (value, key) => key.startsWith('user_'));
// 結果: 'user_1'と'user_2'のエントリを含むMap
```

#### パラメータ

- `map` (`Map<K, V>`): フィルタリングするMapです。
- `callback` (`(value: V, key: K, map: Map<K, V>) => boolean`): 各エントリをテストする述語関数です。

#### 戻り値

(`Map<K, V>`): 述語を満たすエントリのみを含む新しいMapを返します。
