# round (Lodash 互換性)

::: warning `Math.round()`を使用してください

この`round`関数は精度処理により動作が遅いです。

代わりに`Math.round()`を使用するか、希望する小数点で計算してください。

:::

数値を四捨五入します。

```typescript
const rounded = round(number, precision);
```

## 参照

### `round(number, precision?)`

数値を指定した小数点以下の桁数まで四捨五入します。

```typescript
import { round } from 'es-toolkit/compat';

// 基本の四捨五入（小数点以下0桁）
round(4.006);
// Returns: 4

round(4.6);
// Returns: 5

// 小数点指定
round(4.006, 2);
// Returns: 4.01

round(4.123456, 3);
// Returns: 4.123
```

負の精度も可能です。

```typescript
import { round } from 'es-toolkit/compat';

// 十の位で四捨五入
round(4060, -2);
// Returns: 4100

round(1234, -1);
// Returns: 1230

round(1234, -3);
// Returns: 1000
```

負の数も処理します。

```typescript
import { round } from 'es-toolkit/compat';

round(-4.006);
// Returns: -4

round(-4.006, 2);
// Returns: -4.01

round(-1234, -2);
// Returns: -1200
```

#### パラメータ

- `number` (`number`): 四捨五入する数値です。
- `precision` (`number`, オプション): 四捨五入する小数点以下の桁数です。デフォルト値は`0`です。

#### 戻り値

(`number`): 四捨五入された数値を返します。
