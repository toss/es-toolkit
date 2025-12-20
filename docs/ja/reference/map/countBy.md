# countBy (`Map`)

変換関数に基づいてMapの項目の出現回数をカウントします。

```typescript
const counts = countBy(map, mapper);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `countBy(map, mapper)`

Mapのエントリが異なるカテゴリにどれだけ属しているかをカウントしたい場合は `countBy` を使用してください。各値とキーのペアからキーを生成する関数を提供すると、生成されたキーとその個数を値とするMapを返します。変換が同じキーを生成する各エントリに対してカウントが増加します。

```typescript
import { countBy } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 1],
]);

const result = countBy(map, value => value);
// 結果: Map(2) { 1 => 2, 2 => 1 }
```

様々な基準でエントリをカウントできます。

```typescript
import { countBy } from 'es-toolkit/map';

// 値のプロパティでカウントします。
const users = new Map([
  ['user1', { name: 'Alice', age: 25, department: 'Engineering' }],
  ['user2', { name: 'Bob', age: 30, department: 'Engineering' }],
  ['user3', { name: 'Charlie', age: 35, department: 'Sales' }],
]);

const byDepartment = countBy(users, user => user.department);
// 結果: Map(2) { 'Engineering' => 2, 'Sales' => 1 }

// 派生値でカウントします。
const ages = new Map([
  ['p1', 25],
  ['p2', 30],
  ['p3', 25],
  ['p4', 40],
]);

const ageGroups = countBy(ages, age => (age < 30 ? 'young' : 'senior'));
// 結果: Map(2) { 'young' => 2, 'senior' => 2 }

// 値とキーの両方を使用してカウントします。
const items = new Map([
  ['alice', 20],
  ['bob', 30],
  ['carol', 20],
]);

const firstLetter = countBy(items, (value, key) => key[0]);
// 結果: Map(3) { 'a' => 1, 'b' => 1, 'c' => 1 }
```

#### パラメータ

- `map` (`Map<K, V>`): 出現回数をカウントするMapです。
- `mapper` (`(value: V, key: K, object: Map<K, V>) => K2`): カウント用のキーを生成する関数です。

#### 戻り値

(`Map<K2, number>`): マッピングされたキーとその個数を含むMapを返します。
