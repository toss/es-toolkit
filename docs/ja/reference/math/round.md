# round

数値を指定された小数点以下の桁数に四捨五入します。

```typescript
const rounded = round(value, precision?);
```

## 使用法

### `round(value, precision?)`

数値を特定の小数点以下の桁数に四捨五入したい場合は `round` を使用してください。正確な計算のための数学関数です。

```typescript
import { round } from 'es-toolkit/math';

// デフォルト - 整数に四捨五入します。
const num1 = round(1.2345);
console.log(num1); // 1

// 小数点以下第2位まで四捨五入します。
const num2 = round(1.2345, 2);
console.log(num2); // 1.23

// 小数点以下第3位まで四捨五入します。
const num3 = round(1.2387, 3);
console.log(num3); // 1.239

// 負の数も四捨五入できます。
const num4 = round(-1.2345, 2);
console.log(num4); // -1.23

// 大きい数値も処理します。
const num5 = round(123.456789, 4);
console.log(num5); // 123.4568
```

価格計算や統計で便利です。

```typescript
import { round } from 'es-toolkit/math';

// 価格計算(小数点以下第2位まで)
const price = 19.999;
const finalPrice = round(price, 2);
console.log(finalPrice); // 20.00

// パーセント計算(小数点以下第1位まで)
const percentage = 66.66666;
const displayPercentage = round(percentage, 1);
console.log(displayPercentage); // 66.7

// 評価計算(小数点以下第1位まで)
const rating = 4.267;
const displayRating = round(rating, 1);
console.log(displayRating); // 4.3
```

精度が重要な計算で四捨五入します。

```typescript
import { round } from 'es-toolkit/math';

// 数学計算結果を整理
const result = Math.PI * 2;
const cleanResult = round(result, 5);
console.log(cleanResult); // 6.28318

// 測定値を四捨五入
const measurement = 15.789123;
const rounded = round(measurement, 3);
console.log(rounded); // 15.789
```

無効な precision 値はエラーをスローします。

```typescript
import { round } from 'es-toolkit/math';

// precisionが整数でない場合、エラーが発生します。
try {
  round(1.23, 2.5);
} catch (error) {
  console.error(error.message); // 'Precision must be an integer.'
}
```

#### パラメータ

- `value` (`number`): 四捨五入する数値です。
- `precision` (`number`, 選択): 小数点以下の桁数です。整数である必要があり、デフォルト値は `0` です。

#### 戻り値

(`number`): 指定された精度に四捨五入された数値を返します。

#### エラー

- `precision` が整数でない場合、エラーをスローします。
