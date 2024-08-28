# clamp

数値を最小値と最大値の範囲内に制限する関数です。

この関数は数値と2つの境界値を受け取り、指定された範囲内に制限された数値を返します。
1つの境界値のみが提供された場合、値と境界値の最小値を返します。

## インターフェース

```typescript
function clamp(value: number, maximum: number): number;
function clamp(value: number, minimum: number, maximum: number): number;
```

### パラメータ

- `value` (`number`): 制限する数値です。
- `minimum` (`number`): 数値を制限する最小値です。
- `maximum` (`number`): 数値を制限する最大値です。

### 戻り値

(`number`): 指定された範囲内に制限された数値を返します。

## 例

```typescript
const result1 = clamp(10, 5); // 範囲が5に制限されるため、result1は5になります。
const result2 = clamp(10, 5, 15); // 10は5と15の範囲内にあるため、result2は10になります。
const result3 = clamp(2, 5, 15); // 最小値が5のため、result3は5になります。
const result4 = clamp(20, 5, 15); // 最大値が15のため、result4は15になります。
```
