# round

数値を指定された桁数で四捨五入する関数です。

この関数は数値と、オプションで桁数の値を受け取り、指定された小数点以下の桁数で四捨五入された数値を返します。

## インターフェース

```typescript
function round(value: number, precision?: number): number;
```

### パラメータ

- `value` (`number`): 四捨五入する数値です。
- `precision` (`number`, オプション): 四捨五入する小数点以下の桁数です。デフォルト値は0です。

### 戻り値

(`number`): 四捨五入された数値を返します。

## 例

```typescript
const result1 = round(1.2345); // result1は1になります。
const result2 = round(1.2345, 2); // result2は1.23になります。
const result3 = round(1.2345, 3); // result3は1.235になります。
const result4 = round(1.2345, 3.1); // precisionが整数でない場合はエラーを返します。
```
