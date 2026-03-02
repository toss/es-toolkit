# forEach (`Map`)

Mapの各エントリに対して提供された関数を一度ずつ実行します。

```typescript
forEach(map, callback);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `forEach(map, callback)`

Mapの各エントリに対して関数を実行したい場合は `forEach` を使用してください。コールバック関数は値、キー、そしてMap自体を引数として受け取ります。ログ出力、外部状態の更新、または各エントリに対する操作の実行などの副作用に便利です。

```typescript
import { forEach } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

forEach(map, (value, key) => {
  console.log(`${key}: ${value}`);
});
// 出力:
// a: 1
// b: 2
// c: 3
```

各エントリに対して様々な操作を実行できます。

```typescript
import { forEach } from 'es-toolkit/map';

// 値を累積します。
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

let total = 0;
forEach(prices, value => {
  total += value;
});
// totalは4.25になります

// エントリを配列に収集します。
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
]);

const userList: string[] = [];
forEach(users, (value, key) => {
  userList.push(`${key}: ${value.name} (${value.age})`);
});
// userList: ['user1: Alice (25)', 'user2: Bob (30)']

// 条件に基づいて外部Mapを更新します。
const inventory = new Map([
  ['item1', { stock: 10, price: 5 }],
  ['item2', { stock: 0, price: 10 }],
  ['item3', { stock: 5, price: 15 }],
]);

const outOfStock = new Map<string, any>();
forEach(inventory, (value, key) => {
  if (value.stock === 0) {
    outOfStock.set(key, value);
  }
});
// outOfStockにはitem2が含まれます
```

#### パラメータ

- `map` (`Map<K, V>`): 反復処理するMapです。
- `callback` (`(value: V, key: K, map: Map<K, V>) => void`): 各エントリに対して実行する関数です。

#### 戻り値

(`void`): この関数は値を返しません。
