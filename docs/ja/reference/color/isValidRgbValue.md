# isValidRgbValue

数値が有効なRGBカラー値かどうかを検証します。

この関数は、与えられた数値が有効なRGBカラー成分を表すかどうかを確認します。有効なRGB値は0から255（包含）の間の整数である必要があります。

## インターフェース

```typescript
function isValidRgbValue(value: number): boolean;
```

### パラメータ

- `value` (`number`): RGBカラー成分として検証する数値。

### 戻り値

(`boolean`): 値が有効なRGBカラー成分の場合は`true`、そうでない場合は`false`を返します。

## 例

```typescript
import { isValidRgbValue } from 'es-toolkit/color';

// 有効なRGB値
isValidRgbValue(0); // true (最小値)
isValidRgbValue(255); // true (最大値)
isValidRgbValue(128); // true (中間値)
isValidRgbValue(42); // true

// 無効なRGB値 - 範囲外
isValidRgbValue(-1); // false (最小値未満)
isValidRgbValue(256); // false (最大値超過)
isValidRgbValue(300); // false (最大値超過)

// 無効なRGB値 - 整数でない
isValidRgbValue(1.5); // false (小数)
isValidRgbValue(255.1); // false (小数)
isValidRgbValue(42.999); // false (小数)

// 無効なRGB値 - 数値でない
isValidRgbValue(NaN); // false
isValidRgbValue(Infinity); // false
isValidRgbValue(-Infinity); // false
```
