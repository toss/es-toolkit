# findKey (`Map`)

述語関数がtrueを返すMapの最初のキーを見つけます。

```typescript
const key = findKey(map, doesMatch);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `findKey(map, doesMatch)`

特定の条件に一致する最初のエントリのキーを見つけたい場合は `findKey` を使用してください。各エントリをテストする述語関数を提供すると、最初に一致したエントリのキーを返すか、見つからない場合はundefinedを返します。

```typescript
import { findKey } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findKey(map, value => value.quantity > 10);
// 結果: 'grape'
```

様々な基準で検索できます。

```typescript
import { findKey } from 'es-toolkit/map';

// 値のプロパティで検索します。
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
  ['user3', { name: 'Charlie', age: 35 }],
]);

const seniorUser = findKey(users, user => user.age >= 35);
// 結果: 'user3'

// キーのパターンで検索します。
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['db.host', 'localhost'],
]);

const dbSetting = findKey(settings, (value, key) => key.startsWith('db.'));
// 結果: 'db.host'
```

#### パラメータ

- `map` (`Map<K, V>`): 検索するMapです。
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 各エントリをテストする述語関数です。

#### 戻り値

(`K | undefined`): 述語を満たす最初のエントリのキーを返すか、見つからない場合はundefinedを返します。
