# keyBy (`Map`)

提供されたキー生成関数に基づいてMapの各エントリをマッピングします。

```typescript
const result = keyBy(map, getKeyFromEntry);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `keyBy(map, getKeyFromEntry)`

値から新しいキーを生成してMapを再構成したい場合は `keyBy` を使用してください。各値とキーのペアからキーを生成する関数を提供すると、キー関数によって生成されたキーと元のマップの対応する値で構成された新しいMapを返します。複数のエントリが同じキーを生成する場合、最後に見つかった値が使用されます。

```typescript
import { keyBy } from 'es-toolkit/map';

const map = new Map([
  ['x', { type: 'fruit', name: 'apple' }],
  ['y', { type: 'fruit', name: 'banana' }],
  ['z', { type: 'vegetable', name: 'carrot' }],
]);

const result = keyBy(map, item => item.type);
// 結果:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 注: 'banana'は最後の'fruit'だったため保持されます
```

様々な基準でデータを再構成できます。

```typescript
import { keyBy } from 'es-toolkit/map';

// IDプロパティでインデックス化します。
const users = new Map([
  ['user1', { id: 101, name: 'Alice', role: 'admin' }],
  ['user2', { id: 102, name: 'Bob', role: 'user' }],
  ['user3', { id: 103, name: 'Charlie', role: 'user' }],
]);

const byId = keyBy(users, user => user.id);
// 結果: キーが101, 102, 103のMap

// ロール別にインデックス化します(ロールごとの最後のユーザーが選択されます)
const byRole = keyBy(users, user => user.role);
// 結果: Map(2) {
//   'admin' => { id: 101, name: 'Alice', role: 'admin' },
//   'user' => { id: 103, name: 'Charlie', role: 'user' }
// }

// 値と元のキーの両方を使用してキーを変換します。
const inventory = new Map([
  ['item_1', { category: 'electronics', price: 100 }],
  ['item_2', { category: 'electronics', price: 200 }],
]);

const categorized = keyBy(inventory, (value, key) => `${value.category}_${key}`);
// 結果: キーが'electronics_item_1', 'electronics_item_2'のMap
```

#### パラメータ

- `map` (`Map<K, V>`): マッピングするエントリのマップです。
- `getKeyFromEntry` (`(value: V, key: K, object: Map<K, V>) => K2`): 値とキーのペアからキーを生成する関数です。

#### 戻り値

(`Map<K2, V>`): 生成されたキーが各エントリの値にマッピングされたMapを返します。
