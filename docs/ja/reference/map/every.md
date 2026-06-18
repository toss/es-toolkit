# every (`Map`)

Mapのすべてのエントリが提供された述語関数を満たすかどうかをテストします。

```typescript
const allMatch = every(map, doesMatch);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `every(map, doesMatch)`

Mapのすべてのエントリが特定の条件を満たすかどうかを確認したい場合は `every` を使用してください。各エントリをテストする述語関数を提供すると、すべてのエントリが述語を満たす場合はtrueを、そうでない場合はfalseを返します。

```typescript
import { every } from 'es-toolkit/map';

const map = new Map([
  ['a', 10],
  ['b', 20],
  ['c', 30],
]);

const result = every(map, value => value > 5);
// 結果: true

const result2 = every(map, value => value > 15);
// 結果: false
```

様々な条件をテストできます。

```typescript
import { every } from 'es-toolkit/map';

// すべての値が基準を満たすかチェックします。
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 8, inStock: true }],
]);

const allInStock = every(inventory, item => item.inStock);
// 結果: true

// すべてのキーがパターンに一致するかチェックします。
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['api.host', 'localhost'],
]);

const allApiSettings = every(settings, (value, key) => key.startsWith('api.'));
// 結果: true
```

#### パラメータ

- `map` (`Map<K, V>`): テストするMapです。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 各エントリをテストする述語関数です。

#### 戻り値

(`boolean`): すべてのエントリが述語を満たす場合はtrue、そうでない場合はfalseを返します。
