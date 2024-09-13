# random

指定された範囲内でランダムな数値を生成します。ここでの数値には整数だけでなく小数点のある数値も含まれます。

引数が1つだけ与えられた場合、`0`とその数値の間のランダムな数値を返します。

## インターフェース

```typescript
function random(maximum: number): number;
function random(minimum: number, maximum: number): number;
```

### パラメータ

- `minimum` (`number`): ランダムな数値を生成する最小値（含む）です。
- `maximum` (`number`): ランダムな数値を生成する最大値（含まない）です。

### 戻り値

- (`number`): 指定された範囲内のランダムな数値を返します。数値には整数だけでなく小数点のある数値も含まれます。

## 例

```typescript
const result1 = random(0, 5); // 0から5の間のランダムな浮動小数点数を返します。
const result2 = random(5, 0); // 最小値が最大値より大きい場合、エラーが発生します。
const result3 = random(5, 5); // 最小値が最大値と等しい場合、エラーが発生します。
```
