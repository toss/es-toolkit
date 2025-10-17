# random (Lodash 互換性)

::: warning `Math.random()`を使用してください

この `random` 関数は複雑な引数処理と型変換により動作が遅くなります。

代わりに、より高速な `Math.random()` を使用してください。

:::

範囲内でランダムな数値を生成します。

```typescript
const result = random(min, max, floating);
```

## 参照

### `random(floating?)`

0と1の間のランダムな数値を生成します。

```typescript
import { random } from 'es-toolkit/compat';

random();
// Returns: 0.123456789 (0~1の間の小数)

random(true);
// Returns: 0.987654321 (小数で返す)

random(false);
// Returns: 0 または 1 (整数で返す)
```

### `random(max, floating?)`

0からmaxまでのランダムな数値を生成します。

```typescript
import { random } from 'es-toolkit/compat';

random(5);
// Returns: 3.456789 (0~5の間の小数)

random(10, true);
// Returns: 7.123456 (0~10の間の小数)

random(3, false);
// Returns: 2 (0~3の間の整数)
```

### `random(min, max, floating?)`

minからmaxまでのランダムな数値を生成します。

```typescript
import { random } from 'es-toolkit/compat';

random(1, 5);
// Returns: 3.456789 (1~5の間の小数)

random(0, 10, true);
// Returns: 6.789012 (0~10の間の小数)

random(1, 6, false);
// Returns: 4 (1~6の間の整数)
```

範囲が逆の場合は自動的に交換されます。

```typescript
import { random } from 'es-toolkit/compat';

random(5, 1);
// Returns: 3.456789 (範囲が1~5に変更される)
```

guardオブジェクトで特別なケースを処理します。

```typescript
import { random } from 'es-toolkit/compat';

const guard = { 5: 5 };
random(5, 5, guard);
// Returns: 2.345678 (0~5の間の小数)
```

#### パラメータ

- `floating` (`boolean`, オプション): 小数を返すかどうかを決定します。デフォルトは `true` です。
- `max` (`number`): 範囲の最大値です（含まれません）。
- `min` (`number`): 範囲の最小値です（含まれます）。
- `index` (`string | number`): guardオブジェクトで確認するキーです。
- `guard` (`object`): パラメータを検証するguardオブジェクトです。

#### 戻り値

(`number`): 指定された範囲内のランダムな数値を返します。
