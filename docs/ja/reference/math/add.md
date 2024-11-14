# add

2つの数値を加算し、`NaN`を処理する関数です。

この関数は2つの数値を受け取り、その合計を返します。

もし、どちらか一方でも`NaN`の場合、`NaN`を返します。

## インターフェース

```typescript
function add(value: number, other: number): number;
```

### パラメータ

- value (number): 足し算する最初の数値です。
- other (number): 足し算する2番目の数値です。

### 戻り値

(number): 2つの数値の合計を返します。どちらか一方でもNaNの場合は、`NaN`を返します。

## 例

```typescript
const result1 = add(2, 3); // 2つの値はnumber型なので、result1は5になります。
const result2 = add(NaN, 5); // valueがNaNのため、result2はNaNになります。
const result3 = add(10, NaN); // otherがNaNのため、result3はNaNになります。
```
