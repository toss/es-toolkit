# randomInt

指定された範囲内でランダムな整数を生成します。

引数が1つだけ与えられた場合、`0`とその数字の間のランダムな数字を返します。

## インターフェース

```typescript
function random(maximum: number): number;
function randomInt(minimum: number, maximum: number): number;
```

### パラメータ

- `minimum` (`number`): ランダムな整数を生成する最小値（含む）です。
- `maximum` (`number`): ランダムな整数を生成する最大値（含まない）です。

### 戻り値

- (`number`): 指定された範囲内のランダムな整数を返します。

## 例

```typescript
const result1 = randomInt(0, 5); // 0から5の間のランダムな整数を返します。
const result2 = randomInt(5, 0); // 最小値が最大値より大きい場合、エラーが発生します。
const result3 = randomInt(5, 5); // 最小値が最大値と等しい場合、エラーが発生します。
```
