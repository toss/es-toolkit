# zipWith

カスタム結合関数を使用して複数の配列を単一の配列に結合します。
この関数は複数の配列と結合関数を入力として受け取り、入力配列の要素に結合関数を適用した結果からなる新しい配列を返します。

## インターフェース

```typescript
function zipWith<T, R>(arr1: T[], combine: (item: T) => R): R[];
function zipWith<T, U, R>(arr1: T[], arr2: U[], combine: (item1: T, item2: U) => R): R[];
function zipWith<T, U, V, R>(arr1: T[], arr2: U[], arr3: V[], combine: (item1: T, item2: U, item3: V) => R): R[];
function zipWith<T, U, V, W, R>(
  arr1: T[],
  arr2: U[],
  arr3: V[],
  arr4: W[],
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
```

### パラメータ

- `arr1` (`T[]`): 最初に結合する配列です。
- `arr2` (`U[]`, オプション): 2番目に結合する配列です。
- `arr3` (`V[]`, オプション): 3番目に結合する配列です。
- `arr4` (`W[]`, オプション): 4番目に結合する配列です。
- `combine` (`(item1: T, item2: U, item3: V, item4: W) => R`): 各配列の要素を受け取り、単一の値を返す結合関数です。

### 戻り値

(`R[]`): 入力配列の要素に結合関数を適用した結果からなる新しい配列です。

## 例

```typescript
// 2つの配列を使用した例：
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = zipWith(arr1, arr2, (a, b) => a + b);
// resultは [5, 7, 9] になります。

// 3つの配列を使用した例：
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const result = zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`);
// resultは ['135', '246'] になります。
```
