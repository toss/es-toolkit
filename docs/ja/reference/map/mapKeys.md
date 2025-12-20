# mapKeys (`Map`)

提供された関数でキーを変換し、値は同じままの新しいMapを作成します。

```typescript
const transformed = mapKeys(map, getNewKey);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `mapKeys(map, getNewKey)`

Mapのキーを変換しながら値を変更せずに保持したい場合は `mapKeys` を使用してください。各エントリから新しいキーを生成する関数を提供すると、変換されたキーを持つ新しいMapを返します。

```typescript
import { mapKeys } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapKeys(map, (value, key) => key.toUpperCase());
// 結果:
// Map(3) {
//   'A' => 1,
//   'B' => 2,
//   'C' => 3
// }
```

様々な方法でキーを変換できます。

```typescript
import { mapKeys } from 'es-toolkit/map';

// キーに接頭辞を追加します。
const categories = new Map([
  ['fruit', ['apple', 'banana']],
  ['vegetable', ['carrot', 'potato']],
]);

const prefixed = mapKeys(categories, (value, key) => `category_${key}`);
// 結果: 'category_fruit', 'category_vegetable'のキーを持つMap

// 値に基づいて変換します。
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const ranked = mapKeys(scores, (value, key) => (value >= 90 ? `top_${key}` : key));
// 結果: 'top_alice', 'bob', 'top_charlie'のキーを持つMap
```

#### パラメータ

- `map` (`Map<K, V>`): 変換するMapです。
- `getNewKey` (`(value: V, key: K, object: Map<K, V>) => K`): 値とキーのペアから新しいキーを生成する関数です。

#### 戻り値

(`Map<K, V>`): 変換されたキーと同じ値を持つ新しいMapを返します。
