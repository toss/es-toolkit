# sum

数値配列の合計を計算する関数です。

この関数は数値配列を受け取り、配列のすべての要素を足し合わせた合計を返します。

配列が空の場合、この関数は `0` を返します。

配列に `bigint` 値が含まれている場合、関数は `bigint` 値を返します。

## インターフェース

```typescript
function sum(nums: number[]): number;
function sum(nums: bigint[]): bigint;
```

### パラメータ

- `nums` (`number[] | bigint[]`): 合計を計算する数値配列です。

### 戻り値

(`number | bigint`): 配列にあるすべての数値の合計を返します。

## 例

```typescript
sum([1, 2, 3, 4, 5]); // 15
sum([1n, 2n, 3n, 4n, 5n]); // 15n
sum([]); // 0
```
