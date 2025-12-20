# map (`Set`)

提供された関数で要素を変換した新しいSetを作成します。

```typescript
const transformed = map(set, getNewValue);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `map(set, getNewValue)`

Setの要素を変換したい場合は `map` を使用してください。各要素から新しい値を生成する関数を提供すると、変換された要素で構成された新しいSetを返します。

```typescript
import { map } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = map(set, value => value * 2);
// 結果: Set(3) { 2, 4, 6 }
```

様々な方法で要素を変換できます。

```typescript
import { map } from 'es-toolkit/set';

// 文字列を変換します。
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased = map(names, name => name.toUpperCase());
// 結果: Set(3) { 'ALICE', 'BOB', 'CHARLIE' }

// オブジェクトに変換します。
const prices = new Set([10, 20, 30]);

const products = map(prices, price => ({ price, currency: 'USD' }));
// 結果: { price: 10, currency: 'USD' }などのオブジェクトを含むSet

// プロパティを抽出します。
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

const ids = map(users, user => user.id);
// 結果: Set(2) { 1, 2 }
```

#### パラメータ

- `set` (`Set<T>`): 変換するSetです。
- `getNewValue` (`(value: T, value2: T, set: Set<T>) => U`): 要素から新しい値を生成する関数です。

#### 戻り値

(`Set<U>`): 変換された要素を持つ新しいSetを返します。
