# rangeRight (Lodash 互換性)

::: warning es-toolkitの[rangeRight](../../math/rangeRight.md)を使用してください

この `rangeRight` 関数は複雑な引数処理と型変換により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [rangeRight](../../math/rangeRight.md) を使用してください。

:::

数値範囲の配列を逆順で作成します。

```typescript
const numbers = rangeRight(start, end, step);
```

## 参照

### `rangeRight(end)`

0からendまで1ずつ増加させた後、逆順で配列を作成します。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(4);
// Returns: [3, 2, 1, 0]

rangeRight(0);
// Returns: []

rangeRight(-4);
// Returns: [-3, -2, -1, 0]
```

### `rangeRight(start, end)`

startからendまで1ずつ増加させた後、逆順で配列を作成します。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(1, 5);
// Returns: [4, 3, 2, 1]

rangeRight(5, 1);
// Returns: [2, 3, 4, 5] (自動的に-1ずつ減少してから逆順)

rangeRight(-2, 3);
// Returns: [2, 1, 0, -1, -2]
```

### `rangeRight(start, end, step)`

startからendまでstepずつ増加させた後、逆順で配列を作成します。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 8, 2);
// Returns: [6, 4, 2, 0]

rangeRight(0, -4, -1);
// Returns: [-3, -2, -1, 0]

rangeRight(1, 4, 0);
// Returns: [1, 1, 1]
```

小数のstepも可能です。

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 1, 0.2);
// Returns: [0.8, 0.6, 0.4, 0.2, 0]

rangeRight(1, 0, -0.25);
// Returns: [0.25, 0.5, 0.75, 1]
```

iterateeとして使用する場合はguardオブジェクトで処理されます。

```typescript
import { rangeRight } from 'es-toolkit/compat';

[1, 2, 3].map(rangeRight);
// Returns: [[0], [1, 0], [2, 1, 0]]
```

#### パラメータ

- `start` (`number`): 範囲の開始値です（含まれます）。`end`がない場合、この値がendになります。
- `end` (`number`, オプション): 範囲の終了値です（含まれません）。
- `step` (`number`, オプション): 増加幅です。デフォルトは1または-1です。

#### 戻り値

(`number[]`): 指定された範囲の数値配列を逆順で返します。
