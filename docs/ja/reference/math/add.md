# add

2つの数値を足しながら「無効またはNaNの値」を処理する関数です。

この関数は2つの数値を受け取り、その合計を返します。

もし2つの値のうちいずれかが「無効またはNaNの値」であれば、`NaN`を返します。

## インターフェース

```typescript
function add(value: number, other: number): number;
```

### パラメータ

- value (number): 足し算する最初の数値です。
- other (number): 足し算する2番目の数値です。

### 戻り値

(number): 2つの数値の合計を返します。いずれかの値が`NaN`または「無効な値」の場合は、`NaN`を返します。

## 例

```typescript
const result1 = add(2, 3); // 2つの値はnumber型なので、result1は5になります。
const result2 = add(5, 'a'); // otherにnumber型以外の値が入っているため、result2はNaNになります。
const result3 = add(NaN, 10); // valueがNaNであるため、result3はNaNになります。
const result4 = add(2, NaN); // otherがNaNであるため、result4はNaNになります。
```
