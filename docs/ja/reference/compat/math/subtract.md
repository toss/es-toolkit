# subtract (Lodash 互換性)

::: warning `-` 演算子を使用してください

この `subtract` 関数は追加の関数呼び出しにより動作が遅くなります。

代わりに、より高速でシンプルな `-` 演算子を使用してください。

:::

2つの数値を減算します。

```typescript
const result = subtract(value, other);
```

## 参照

### `subtract(value, other)`

2つの数値を減算したい場合は `subtract` を使用してください。

```typescript
import { subtract } from 'es-toolkit/compat';

// 基本的な減算
subtract(6, 4);
// Returns: 2

subtract(10, 3);
// Returns: 7

// 負の数の処理
subtract(-6, 4);
// Returns: -10

subtract(6, -4);
// Returns: 10

// NaN の処理
subtract(NaN, 4);
// Returns: NaN

subtract(6, NaN);
// Returns: NaN

subtract(NaN, NaN);
// Returns: NaN
```

#### パラメータ

- `value` (`number`): 減算の基準となる最初の数値です。
- `other` (`number`): 減算する2番目の数値です。

#### 戻り値

(`number`): 最初の数値から2番目の数値を減算した結果を返します。どちらか一方でもNaNの場合はNaNを返します。
