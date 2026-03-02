# countBy (`Set`)

変換関数に基づいてSetの項目の出現回数をカウントします。

```typescript
const counts = countBy(set, mapper);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `countBy(set, mapper)`

Setの要素が異なるカテゴリにどれだけ属しているかをカウントしたい場合は `countBy` を使用してください。各値からキーを生成する関数を提供すると、生成されたキーとその個数を値とするMapを返します。変換が同じキーを生成する各要素に対してカウントが増加します。

```typescript
import { countBy } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = countBy(set, value => (value % 2 === 0 ? 'even' : 'odd'));
// 結果: Map(2) { 'odd' => 3, 'even' => 2 }
```

様々な基準で要素をカウントできます。

```typescript
import { countBy } from 'es-toolkit/set';

// 文字列の長さでカウントします。
const words = new Set(['apple', 'banana', 'cherry', 'date']);

const byLength = countBy(words, word => word.length);
// 結果: Map(3) { 5 => 1, 6 => 2, 4 => 1 }

// プロパティでカウントします。
const users = new Set([
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'user' },
  { name: 'Diana', role: 'admin' },
]);

const byRole = countBy(users, user => user.role);
// 結果: Map(2) { 'admin' => 2, 'user' => 2 }

// 派生カテゴリでカウントします。
const ages = new Set([15, 25, 35, 45, 55]);

const ageGroups = countBy(ages, age => {
  if (age < 18) return 'minor';
  if (age < 65) return 'adult';
  return 'senior';
});
// 結果: Map(2) { 'minor' => 1, 'adult' => 4 }
```

#### パラメータ

- `set` (`Set<T>`): 出現回数をカウントするSetです。
- `mapper` (`(value: T, value2: T, set: Set<T>) => K`): カウント用のキーを生成する関数です。

#### 戻り値

(`Map<K, number>`): マッピングされたキーとその個数を含むMapを返します。
