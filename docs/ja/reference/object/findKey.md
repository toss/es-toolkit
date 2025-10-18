# findKey

与えられた条件を満たす最初の要素のキーを見つけます。

```typescript
const key = findKey(obj, predicate);
```

## 参照

### `findKey(obj, predicate)`

オブジェクトで特定の条件を満たす最初の要素のキーを見つけたい時に`findKey`を使用してください。条件関数が`true`を返す最初の値のキーを返します。

```typescript
import { findKey } from 'es-toolkit/object';

// 年齢が30未満の最初のユーザーを見つける
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

const youngUserKey = findKey(users, user => user.age < 30);
console.log(youngUserKey); // 'alice'

// 非アクティブユーザーを見つける
const inactiveUserKey = findKey(users, user => !user.active);
console.log(inactiveUserKey); // 'bob'

// 条件を満たす要素がない場合
const seniorUserKey = findKey(users, user => user.age > 50);
console.log(seniorUserKey); // undefined
```

条件関数は現在の値、キー、全体のオブジェクトを受け取ります。

```typescript
const data = {
  item1: { priority: 'high', status: 'pending' },
  item2: { priority: 'low', status: 'done' },
  item3: { priority: 'high', status: 'done' },
};

// キー名と値の両方を考慮した検索
const result = findKey(data, (value, key, obj) => {
  return key.includes('2') && value.status === 'done';
});
console.log(result); // 'item2'
```

複雑なオブジェクト構造でも使用できます。

```typescript
const products = {
  laptop: {
    specs: { ram: 16, cpu: 'Intel i7' },
    price: 1200,
    available: true,
  },
  phone: {
    specs: { ram: 8, cpu: 'Snapdragon' },
    price: 800,
    available: false,
  },
  tablet: {
    specs: { ram: 12, cpu: 'Apple M1' },
    price: 1000,
    available: true,
  },
};

const affordableKey = findKey(products, product => product.price < 1000 && product.available);
console.log(affordableKey); // undefined (条件を満たす製品なし)

const highRamKey = findKey(products, product => product.specs.ram >= 12);
console.log(highRamKey); // 'laptop'
```

#### パラメータ

- `obj` (`T extends Record<any, any>`): 検索するオブジェクトです。
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 各要素に対して実行する条件関数です。`true`を返す最初の要素のキーを見つけます。

#### 戻り値

(`keyof T | undefined`): 条件を満たす最初の要素のキーです。条件を満たす要素がない場合は`undefined`を返します。
