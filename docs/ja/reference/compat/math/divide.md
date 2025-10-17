# divide (Lodash 互換性)

::: warning `/` 演算子を使用してください

この `divide` 関数は追加の関数呼び出しにより動作が遅くなります。

代わりに、より高速でシンプルな `/` 演算子を使用してください。

:::

2つの数値を除算します。

```typescript
const result = divide(value, other);
```

## 参照

### `divide(value, other)`

2つの数値を除算したい場合は `divide` を使用してください。

```typescript
import { divide } from 'es-toolkit/compat';

// 基本的な除算
divide(6, 3);
// Returns: 2

divide(10, 5);
// Returns: 2

// 小数除算
divide(7, 2);
// Returns: 3.5

divide(1, 3);
// Returns: 0.3333333333333333

// 0での除算
divide(6, 0);
// Returns: Infinity

divide(-6, 0);
// Returns: -Infinity

// NaN の処理
divide(2, NaN);
// Returns: NaN

divide(NaN, 3);
// Returns: NaN

divide(NaN, NaN);
// Returns: NaN
```

#### パラメータ

- `value` (`number`): 除算の被除数（分けられる数）です。
- `other` (`number`): 除算の除数（分ける数）です。

#### 戻り値

(`number`): 最初の数値を2番目の数値で除算した結果を返します。どちらか一方でもNaNの場合はNaNを返します。
