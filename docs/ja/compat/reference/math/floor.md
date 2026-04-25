# floor (Lodash 互換性)

::: warning `Math.floor`を使用してください

この `floor` 関数は小数点桁数の計算と内部関数呼び出しにより動作が遅くなります。

代わりに、より高速で現代的な `Math.floor` を使用してください。

:::

数値を指定された小数点桁数で切り捨てます。

```typescript
const result = floor(number, precision);
```

## 使用法

### `floor(number, precision?)`

数値を特定の小数点桁数で切り捨てたい場合は `floor` を使用してください。

```typescript
import { floor } from 'es-toolkit/compat';

// 基本的な切り捨て（整数へ）
floor(4.9);
// Returns: 4

floor(4.1);
// Returns: 4

// 小数点第2位で切り捨て
floor(6.994, 2);
// Returns: 6.99

floor(6.999, 2);
// Returns: 6.99

// 負の桁数で切り捨て（10の単位）
floor(6040, -2);
// Returns: 6000

floor(1234, -2);
// Returns: 1200

// 負の数も切り捨て
floor(-4.1);
// Returns: -5

floor(-6.994, 2);
// Returns: -7.00
```

#### パラメータ

- `number` (`number`): 切り捨てる数値です。
- `precision` (`number`, オプション): 切り捨てる小数点桁数です。デフォルトは `0` です。

#### 戻り値

(`number`): 指定された小数点桁数で切り捨てられた数値を返します。
