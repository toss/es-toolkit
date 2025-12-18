# forEach (`Set`)

Setの各要素に対して提供された関数を一度ずつ実行します。

```typescript
forEach(set, callback);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `forEach(set, callback)`

Setの各要素に対して関数を実行したい場合は `forEach` を使用してください。コールバック関数は値を2回 (Map.forEachとの一貫性のため)、そしてSet自体を引数として受け取ります。ログ出力、外部状態の更新、または各要素に対する操作の実行などの副作用に便利です。

```typescript
import { forEach } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

forEach(set, value => {
  console.log(value * 2);
});
// 出力:
// 2
// 4
// 6
```

各要素に対して様々な操作を実行できます。

```typescript
import { forEach } from 'es-toolkit/set';

// 値を累積します。
const numbers = new Set([1, 2, 3, 4, 5]);

let sum = 0;
forEach(numbers, value => {
  sum += value;
});
// sumは15になります

// 変換しながら要素を配列に収集します。
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased: string[] = [];
forEach(names, value => {
  uppercased.push(value.toUpperCase());
});
// uppercased: ['ALICE', 'BOB', 'CHARLIE']

// 条件に基づいて外部Setを更新します。
const scores = new Set([85, 92, 78, 95, 88]);

const highScores = new Set<number>();
forEach(scores, value => {
  if (value >= 90) {
    highScores.add(value);
  }
});
// highScoresには92と95が含まれます

// オブジェクトを処理します。
const users = new Set([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
]);

const activeUserIds: number[] = [];
forEach(users, user => {
  if (user.active) {
    activeUserIds.push(user.id);
  }
});
// activeUserIds: [1, 3]
```

#### パラメータ

- `set` (`Set<T>`): 反復処理するSetです。
- `callback` (`(value: T, value2: T, set: Set<T>) => void`): 各要素に対して実行する関数です。

#### 戻り値

(`void`): この関数は値を返しません。
