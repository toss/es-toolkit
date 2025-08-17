# fill

配列の要素を指定された値で埋めます。開始位置から終了位置までの要素を提供された値で置き換えます。

この関数は元の配列を変更し、提供された値で開始インデックスから終了インデックスまでの要素を置き換えます。
開始または終了インデックスを提供しない場合、配列全体を埋めます。

負のインデックスを使用することもできます。この場合、配列の末尾からインデックスを計算します。

## インターフェース

```typescript
function fill<T>(array: unknown[], value: T): T[];
function fill<T, U>(array: Array<T | U>, value: U, start: number): Array<T | U>;
function fill<T, U>(array: Array<T | U>, value: U, start: number, end: number): Array<T | U>;
```

### パラメータ

- `array` (`Array<T | U>`): 埋める配列です。
- `value` (`U`): 配列を埋める値です。
- `start` (`number`, デフォルト = 0): 開始位置です。デフォルトは0です。
- `end` (`number`, デフォルト = array.length): 終了位置です。デフォルトは配列の長さです。

### 戻り値

(`Array<T | U>`): 埋められた値がある配列を返します。

## 例

```typescript
const array1 = [1, 2, 3];
const result1 = fill(array1, 'a');
// result1は ['a', 'a', 'a'] になります。

const array2 = Array(3);
const result2 = fill(array2, 2);
// result2は [2, 2, 2] になります。

const array3 = [4, 6, 8, 10];
const result3 = fill(array3, '*', 1, 3);
// result3は [4, '*', '*', 10] になります。

const array4 = [1, 2, 3];
const result4 = fill(array4, '*', -2, -1);
// result4は [1, '*', 3] になります。
```
