# toFilled

配列の要素を指定された値で埋めます。開始位置から終了位置までの要素を提供された値で置き換えた新しい配列を返します。開始または終了インデックスを提供しない場合、配列全体を埋めます。

負のインデックスを使用することもできます。この場合、配列の末尾からインデックスを計算します。

## インターフェース

```typescript
function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
```

### パラメータ

- `arr` (`T[]`): 埋める配列です。
- `value` (`U`): 配列を埋める値です。
- `start` (`number, デフォルト = 0`): 開始位置です。デフォルトは0です。
- `end` (`number, デフォルト = array.length`): 終了位置です。デフォルトは配列の長さです。

### 戻り値

(`Array<T | U>`): 指定された値で埋められた新しい配列です。

### 例

```typescript
const array = [1, 2, 3, 4, 5];

let result = toFilled(array, '*', 2);
console.log(result); // [1, 2, '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', 1, 4);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*');
console.log(result); // ['*', '*', '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', -4, -1);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]
```
