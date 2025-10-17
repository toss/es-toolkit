# clamp (Lodash 互換性)

::: warning `es-toolkit`の[clamp](../../math/clamp.md)を使用してください

この `clamp` 関数はNaN検証と処理により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [clamp](../../math/clamp.md) を使用してください。

:::

数値を指定された範囲内に制限します。

```typescript
const clamped = clamp(number, lower, upper);
```

## 参照

### `clamp(number, lower, upper)`

数値を指定された最小値と最大値の間に制限したい場合は `clamp` を使用してください。

```typescript
import { clamp } from 'es-toolkit/compat';

// 基本的な使用法
clamp(3, 2, 4);
// Returns: 3 (範囲内にある)

clamp(0, 5, 10);
// Returns: 5 (最小値で制限)

clamp(15, 5, 10);
// Returns: 10 (最大値で制限)

// 負の数も処理
clamp(-5, -10, -1);
// Returns: -5

clamp(-15, -10, -1);
// Returns: -10 (最小値で制限)
```

### `clamp(number, upper)`

1つの引数のみを提供すると、その値を最大値として使用します。

```typescript
import { clamp } from 'es-toolkit/compat';

// 最大値のみ指定
clamp(5, 3);
// Returns: 3 (最大値で制限)

clamp(2, 3);
// Returns: 2 (範囲内にある)

clamp(1, 5);
// Returns: 1
```

NaN値は0として処理されます。

```typescript
import { clamp } from 'es-toolkit/compat';

clamp(5, NaN, 10);
// Returns: 5 (NaNが0として処理され、範囲は0〜10)

clamp(5, 2, NaN);
// Returns: 2 (NaNが0として処理され、範囲は0〜2)
```

#### パラメータ

- `number` (`number`): 制限する数値です。
- `lower` (`number`): 最小値です。2番目のパラメータのみがある場合は最大値になります。
- `upper` (`number`, オプション): 最大値です。

#### 戻り値

(`number`): 指定された範囲内に制限された数値を返します。
