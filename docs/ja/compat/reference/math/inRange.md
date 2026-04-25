# inRange (Lodash 互換性)

::: warning `es-toolkit`の[inRange](../../math/inRange.md)を使用してください

この `inRange` 関数は複雑な型変換とnull/undefined処理により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [inRange](../../math/inRange.md) を使用してください。

:::

数値が指定された範囲内にあるかを確認します。

```typescript
const result = inRange(value, minimum, maximum);
```

## 使用法

### `inRange(value, minimum, maximum?)`

数値が特定の範囲内にあるかを確認したい場合は `inRange` を使用してください。最小値は含まれ、最大値は含まれません。

```typescript
import { inRange } from 'es-toolkit/compat';

// 基本的な使用法
inRange(3, 2, 4);
// Returns: true (2 ≤ 3 < 4)

inRange(1, 2, 5);
// Returns: false (1 < 2)

inRange(5, 2, 5);
// Returns: false (5は含まれない)

// 範囲境界値
inRange(2, 2, 4);
// Returns: true (最小値は含まれる)

inRange(4, 2, 4);
// Returns: false (最大値は含まれない)
```

### `inRange(value, maximum)`

2つの引数のみを提供すると、0からmaximumまでの範囲として処理されます。

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5);
// Returns: true (0 ≤ 3 < 5)

inRange(-1, 5);
// Returns: false (-1 < 0)

inRange(0, 5);
// Returns: true (0 ≤ 0 < 5)

inRange(5, 5);
// Returns: false (5は含まれない)
```

最小値が最大値より大きい場合は自動的に交換されます。

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5, 2);
// Returns: true (範囲が2〜5に変更され、2 ≤ 3 < 5)

inRange(1, 5, 2);
// Returns: false (1 < 2)
```

不正な値は適切に変換されます。

```typescript
import { inRange } from 'es-toolkit/compat';

// 文字列数値変換
inRange(3, '2', '4');
// Returns: true

// falsy値は0として処理
inRange(1, null, 5);
// Returns: true (nullが0として処理され、0〜5の範囲)

inRange(3, false, 5);
// Returns: true (falseが0として処理)
```

#### パラメータ

- `value` (`number`): 範囲内にあるかを確認する数値です。
- `minimum` (`number`): 範囲の最小値です（含まれる）。`maximum`がない場合、この値が最大値になります。
- `maximum` (`number`, オプション): 範囲の最大値です（含まれない）。

#### 戻り値

(`boolean`): 値が指定された範囲内にある場合は `true`、そうでなければ `false` を返します。
