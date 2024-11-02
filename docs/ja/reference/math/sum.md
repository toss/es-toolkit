# sum

数値配列の合計を計算する関数です。

この関数は数値配列を受け取り、配列のすべての要素を足し合わせた合計を返します。

## インターフェース

```typescript
function sum(nums: number[]): number;
```

### パラメータ

- `nums` (`number[]`): 合計を計算する数値配列です。

### 戻り値

(`number`): 配列にあるすべての数値の合計を返します。

## 例

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = sum(numbers);
// resultは15になります。
```
