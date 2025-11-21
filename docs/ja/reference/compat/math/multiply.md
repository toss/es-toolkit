# multiply (Lodash 互換性)

::: warning `*` 演算子を使用してください

この `multiply` 関数は追加の関数呼び出しにより動作が遅くなります。

代わりに、より高速でシンプルな `*` 演算子を使用してください。

:::

2つの数値を乗算します。

```typescript
const result = multiply(value, other);
```

## 使用法

### `multiply(value, other)`

2つの数値を乗算したい場合は `multiply` を使用してください。

```typescript
import { multiply } from 'es-toolkit/compat';

// 基本的な乗算
multiply(2, 3);
// Returns: 6

multiply(4, 5);
// Returns: 20

// 負の数の処理
multiply(2, -3);
// Returns: -6

multiply(-4, -5);
// Returns: 20

// 小数の処理
multiply(2.5, 4);
// Returns: 10

// NaN の処理
multiply(NaN, 3);
// Returns: NaN

multiply(2, NaN);
// Returns: NaN

multiply(NaN, NaN);
// Returns: NaN
```

#### パラメータ

- `value` (`number`): 乗算の最初の数値です。
- `other` (`number`): 乗算の2番目の数値です。

#### 戻り値

(`number`): 2つの数値を乗算した結果を返します。どちらか一方でもNaNの場合はNaNを返します。
