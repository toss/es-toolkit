# every (`Set`)

Setのすべての要素が提供された述語関数を満たすかどうかをテストします。

```typescript
const allMatch = every(set, doesMatch);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `every(set, doesMatch)`

Setのすべての要素が特定の条件を満たすかどうかを確認したい場合は `every` を使用してください。各要素をテストする述語関数を提供すると、すべての要素が述語を満たす場合はtrueを、そうでない場合はfalseを返します。

```typescript
import { every } from 'es-toolkit/set';

const set = new Set([10, 20, 30]);

const result = every(set, value => value > 5);
// 結果: true

const result2 = every(set, value => value > 15);
// 結果: false
```

様々な条件をテストできます。

```typescript
import { every } from 'es-toolkit/set';

// すべての値が基準を満たすかチェックします。
const ages = new Set([25, 30, 35, 40]);

const allAdults = every(ages, age => age >= 18);
// 結果: true

const allSeniors = every(ages, age => age >= 65);
// 結果: false

// オブジェクトのプロパティをチェックします。
const users = new Set([
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
]);

const allActive = every(users, user => user.active);
// 結果: true
```

#### パラメータ

- `set` (`Set<T>`): テストするSetです。
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 各要素をテストする述語関数です。

#### 戻り値

(`boolean`): すべての要素が述語を満たす場合はtrue、そうでない場合はfalseを返します。
