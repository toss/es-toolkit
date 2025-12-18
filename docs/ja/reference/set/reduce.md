# reduce (`Set`)

Setの要素を反復処理してコールバック関数を適用し、単一の値に縮小します。

```typescript
const result = reduce(set, callback, initialValue);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `reduce(set, callback, initialValue?)`

各要素から結果を蓄積してSetを単一の値に変換したい場合は `reduce` を使用してください。各要素を処理してアキュムレータを更新するコールバック関数を提供してください。初期値が提供されると、アキュムレータの開始値として使用されます。初期値が提供されずSetが空の場合、TypeErrorがスローされます。

```typescript
import { reduce } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = reduce(set, (acc, value) => acc + value, 0);
// 結果: 6
```

様々な方法でSetを縮小できます。

```typescript
import { reduce } from 'es-toolkit/set';

// 初期値を使用して合計を計算します。
const numbers = new Set([10, 20, 30, 40]);

const total = reduce(numbers, (acc, num) => acc + num, 0);
// 結果: 100

// 初期値なし(最初の要素を使用)
const values = new Set([5, 10]);

const sum = reduce(values, (acc, value) => acc + value);
// 結果: 15 (最初の値5から開始)

// Setから配列を構築します。
const uniqueNames = new Set(['Alice', 'Bob', 'Charlie']);

const nameList = reduce(
  uniqueNames,
  (acc, name) => [...acc, name.toUpperCase()],
  [] as string[]
);
// 結果: ['ALICE', 'BOB', 'CHARLIE']
```

#### パラメータ

- `set` (`Set<T>`): 縮小するSetです。
- `callback` (`(accumulator: A, value: T, value2: T, set: Set<T>) => A`): 各要素を処理してアキュムレータを更新する関数です。
- `initialValue` (`A`, オプション): アキュムレータの初期値です。提供されない場合、Setの最初の要素が使用されます。

#### 戻り値

(`A`): 最終的に蓄積された値を返します。

#### 例外

(`TypeError`): Setが空で初期値が提供されない場合にスローされます。
