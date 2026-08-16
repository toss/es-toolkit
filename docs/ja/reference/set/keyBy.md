# keyBy (`Set`)

提供されたキー生成関数に基づいてSetの各要素をマッピングします。

```typescript
const result = keyBy(set, getKeyFromValue);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `keyBy(set, getKeyFromValue)`

値からキーを生成してSetをMapに変換したい場合は `keyBy` を使用してください。各値からキーを生成する関数を提供すると、キー関数によって生成されたキーと元のセットの対応する値で構成された新しいMapを返します。複数の要素が同じキーを生成する場合、最後に見つかった値が使用されます。

```typescript
import { keyBy } from 'es-toolkit/set';

const set = new Set([
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'carrot' },
]);

const result = keyBy(set, item => item.type);
// 結果:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 注: 'banana'は最後の'fruit'だったため保持されます
```

様々な基準でインデックスを作成できます。

```typescript
import { keyBy } from 'es-toolkit/set';

// IDでインデックス化します。
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]);

const byId = keyBy(users, user => user.id);
// 結果: Map(3) { 1 => {...}, 2 => {...}, 3 => {...} }

// 名前でインデックス化します。
const byName = keyBy(users, user => user.name);
// 結果: キーが'Alice', 'Bob', 'Charlie'のMap

// 派生値でインデックス化します。
const numbers = new Set([1, 2, 3, 4, 5]);

const byParity = keyBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 結果: Map(2) {
//   'odd' => 5,
//   'even' => 4
// }
// 注: 最後の偶数(4)と最後の奇数(5)が保持されます
```

#### パラメータ

- `set` (`Set<T>`): マッピングする要素のSetです。
- `getKeyFromValue` (`(value: T, value2: T, set: Set<T>) => K`): 値からキーを生成する関数です。

#### 戻り値

(`Map<K, T>`): 生成されたキーが各要素の値にマッピングされたMapを返します。
