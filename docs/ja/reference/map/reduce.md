# reduce (`Map`)

Mapのエントリを反復処理してコールバック関数を適用し、単一の値に縮小します。

```typescript
const result = reduce(map, callback, initialValue);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `reduce(map, callback, initialValue?)`

各エントリから結果を蓄積してMapを単一の値に変換したい場合は `reduce` を使用してください。各エントリを処理してアキュムレータを更新するコールバック関数を提供してください。初期値が提供されると、アキュムレータの開始値として使用されます。初期値が提供されずMapが空の場合、TypeErrorがスローされます。

```typescript
import { reduce } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = reduce(map, (acc, value) => acc + value, 0);
// 結果: 6
```

様々な方法でMapを縮小できます。

```typescript
import { reduce } from 'es-toolkit/map';

// 初期値を使用して合計を計算します。
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const totalScore = reduce(scores, (acc, score) => acc + score, 0);
// 結果: 274

// 初期値なし(最初の値を使用)
const numbers = new Map([
  ['a', 10],
  ['b', 20],
]);

const sum = reduce(numbers, (acc, value) => acc + value);
// 結果: 30 (最初の値10から開始)

// Mapからオブジェクトを構築します。
const settings = new Map([
  ['theme', 'dark'],
  ['lang', 'en'],
  ['notifications', true],
]);

const config = reduce(
  settings,
  (acc, value, key) => ({ ...acc, [key]: value }),
  {} as Record<string, any>
);
// 結果: { theme: 'dark', lang: 'en', notifications: true }
```

#### パラメータ

- `map` (`Map<K, V>`): 縮小するMapです。
- `callback` (`(accumulator: A, value: V, key: K, map: Map<K, V>) => A`): 各エントリを処理してアキュムレータを更新する関数です。
- `initialValue` (`A`, オプション): アキュムレータの初期値です。提供されない場合、Mapの最初の値が使用されます。

#### 戻り値

(`A`): 最終的に蓄積された値を返します。

#### 例外

(`TypeError`): Mapが空で初期値が提供されない場合にスローされます。
