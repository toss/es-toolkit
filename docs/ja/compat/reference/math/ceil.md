# ceil (Lodash 互換性)

::: warning `Math.ceil`を使用してください

この `ceil` 関数は小数点桁数の計算と内部関数呼び出しにより動作が遅くなります。

代わりに、より高速で現代的な `Math.ceil` を使用してください。

:::

数値を指定された小数点桁数で切り上げます。

```typescript
const result = ceil(number, precision);
```

## 使用法

### `ceil(number, precision?)`

数値を特定の小数点桁数で切り上げたい場合は `ceil` を使用してください。

```typescript
import { ceil } from 'es-toolkit/compat';

// 基本的な切り上げ（整数へ）
ceil(4.006);
// Returns: 5

ceil(4.1);
// Returns: 5

// 小数点第2位で切り上げ
ceil(6.004, 2);
// Returns: 6.01

ceil(6.001, 2);
// Returns: 6.01

// 負の桁数で切り上げ（10の単位）
ceil(6040, -2);
// Returns: 6100

ceil(1234, -2);
// Returns: 1300

// 負の数も切り上げ
ceil(-4.1);
// Returns: -4

ceil(-6.004, 2);
// Returns: -6.00
```

#### パラメータ

- `number` (`number`): 切り上げる数値です。
- `precision` (`number`, オプション): 切り上げる小数点桁数です。デフォルトは `0` です。

#### 戻り値

(`number`): 指定された小数点桁数で切り上げられた数値を返します。
