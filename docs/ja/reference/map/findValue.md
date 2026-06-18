# findValue (`Map`)

述語関数がtrueを返すMapの最初の値を見つけます。

```typescript
const value = findValue(map, doesMatch);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `findValue(map, doesMatch)`

特定の条件に一致する最初のエントリの値を見つけたい場合は `findValue` を使用してください。各エントリをテストする述語関数を提供すると、最初に一致したエントリの値を返すか、見つからない場合はundefinedを返します。

```typescript
import { findValue } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findValue(map, value => value.quantity > 10);
// 結果: { color: 'purple', quantity: 15 }
```

様々な基準で検索できます。

```typescript
import { findValue } from 'es-toolkit/map';

// 値のプロパティで検索します。
const products = new Map([
  ['p1', { name: 'Laptop', price: 1000, inStock: true }],
  ['p2', { name: 'Mouse', price: 25, inStock: false }],
  ['p3', { name: 'Keyboard', price: 75, inStock: true }],
]);

const expensiveProduct = findValue(products, product => product.price > 500);
// 結果: { name: 'Laptop', price: 1000, inStock: true }

// キーのパターンで検索します。
const cache = new Map([
  ['temp_1', { data: 'foo', timestamp: 100 }],
  ['perm_1', { data: 'bar', timestamp: 200 }],
  ['temp_2', { data: 'baz', timestamp: 300 }],
]);

const permanent = findValue(cache, (value, key) => key.startsWith('perm_'));
// 結果: { data: 'bar', timestamp: 200 }
```

#### パラメータ

- `map` (`Map<K, V>`): 検索するMapです。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 各エントリをテストする述語関数です。

#### 戻り値

(`V | undefined`): 述語を満たす最初のエントリの値を返すか、見つからない場合はundefinedを返します。
