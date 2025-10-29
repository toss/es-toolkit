# range (Lodash 互換性)

::: warning es-toolkitの[range](../../math/range.md)を使用してください

この `range` 関数は複雑な引数処理と型変換により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [range](../../math/range.md) を使用してください。

:::

数値範囲の配列を作成します。

```typescript
const numbers = range(start, end, step);
```

## 参照

### `range(end)`

0からendまで1ずつ増加する配列を作成します。

```typescript
import { range } from 'es-toolkit/compat';

range(4);
// Returns: [0, 1, 2, 3]

range(0);
// Returns: []

range(-4);
// Returns: [0, -1, -2, -3]
```

### `range(start, end)`

startからendまで1ずつ増加する配列を作成します。

```typescript
import { range } from 'es-toolkit/compat';

range(1, 5);
// Returns: [1, 2, 3, 4]

range(5, 1);
// Returns: [5, 4, 3, 2] (自動的に-1ずつ減少)

range(-2, 3);
// Returns: [-2, -1, 0, 1, 2]
```

### `range(start, end, step)`

startからendまでstepずつ増加する配列を作成します。

```typescript
import { range } from 'es-toolkit/compat';

range(0, 20, 5);
// Returns: [0, 5, 10, 15]

range(0, -4, -1);
// Returns: [0, -1, -2, -3]

range(1, 4, 0);
// Returns: [1, 1, 1]
```

小数のstepも可能です。

```typescript
import { range } from 'es-toolkit/compat';

range(0, 1, 0.2);
// Returns: [0, 0.2, 0.4, 0.6, 0.8]

range(1, 0, -0.25);
// Returns: [1, 0.75, 0.5, 0.25]
```

iterateeとして使用する場合はguardオブジェクトで処理されます。

```typescript
import { range } from 'es-toolkit/compat';

[1, 2, 3].map(range);
// Returns: [[0], [0, 1], [0, 1, 2]]
```

#### パラメータ

- `start` (`number`): 範囲の開始値です（含まれます）。`end`がない場合、この値がendになります。
- `end` (`number`, オプション): 範囲の終了値です（含まれません）。
- `step` (`number`, オプション): 増加幅です。デフォルトは1または-1です。

#### 戻り値

(`number[]`): 指定された範囲の数値配列を返します。
