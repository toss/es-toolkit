# unzipWith

結合されている配列を解いて、変換関数を適用した新しい配列を返します。

```typescript
const transformedArray = unzipWith(target, iteratee);
```

## 参照

### `unzipWith(target, iteratee)`

複数の配列が結合されている2次元配列から同じ位置の要素を集めて変換関数を適用した結果を得たい場合は `unzipWith` を使用してください。`unzip` と似ていますが、各グループの要素をカスタム関数で変換できます。

```typescript
import { unzipWith } from 'es-toolkit/array';

// 同じ位置の数値を足します。
const numbers = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sums = unzipWith(numbers, (a, b, c) => a + b + c);
console.log(sums); // [9, 12] (1+3+5=9, 2+4+6=12)

// 同じ位置の文字列を連結します。
const words = [
  ['hello', 'world'],
  ['foo', 'bar'],
  ['es', 'toolkit'],
];
const combined = unzipWith(words, (a, b, c) => a + b + c);
console.log(combined); // ['hellofooes', 'worldbartoolkit']

// オブジェクト配列から特定のプロパティの平均を求めます。
const scores = [
  [{ score: 80 }, { score: 90 }],
  [{ score: 85 }, { score: 95 }],
  [{ score: 75 }, { score: 88 }],
];
const averages = unzipWith(scores, (a, b, c) => (a.score + b.score + c.score) / 3);
console.log(averages); // [80, 91] (80+85+75)/3, (90+95+88)/3
```

配列の長さが異なる場合はundefinedが渡されます。

```typescript
import { unzipWith } from 'es-toolkit/array';

const mixed = [
  [1, 4],
  [2, 5],
  [3], // 長さが異なる
];
const result = unzipWith(mixed, (a, b, c) => {
  // cはundefinedになる可能性があります
  return (a || 0) + (b || 0) + (c || 0);
});
console.log(result); // [6, 9] (1+2+3, 4+5+0)
```

空の配列を渡すと空の配列を返します。

```typescript
import { unzipWith } from 'es-toolkit/array';

const empty = unzipWith([], (a, b) => a + b);
console.log(empty); // []
```

#### パラメータ

- `target` (`readonly T[][]`): 解いて変換する配列が結合されている2次元配列です。
- `iteratee` (`(...args: T[]) => R`): 同じ位置の要素を受け取って新しい値に変換する関数です。

#### 戻り値

(`R[]`): 変換関数を適用した結果で作られた新しい配列です。

## Lodashとの互換性

`es-toolkit/compat`から`unzipWith`をインポートすると、lodashと完全に互換性があります。

互換モードでは以下の機能を提供します：

- **null/undefinedの処理**: 入力配列がnullまたはundefinedの場合、空の配列を返します。
- **配列風オブジェクト**: 通常の配列の他に、配列風オブジェクト(array-like objects)も処理できます。
- **iteratee関数**: iteratee関数は再構成された要素を引数として受け取り、任意の型に変換できます。iterateeがnullまたはundefinedの場合、`unzip`のように動作し、変換せずに結合が解かれた配列を返します。

### インターフェース

```typescript
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];
function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];
function unzipWith<T, R>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee: (...args: T[]) => R): R[];
function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];
```

### 例

```typescript
// iteratee関数を使用する例
const array1 = [
  [1, 3],
  [2, 4],
];
const result1 = unzipWith(array1, (a, b) => a + b);
// result1は[3, 7]になります。iteratee関数が提供されると、再構成された要素を変換するためです。

// iterateeがnullまたはundefinedの場合
const array2 = [
  [1, 3],
  [2, 4],
];
const result2 = unzipWith(array2, null);
// result2は[[1, 2], [3, 4]]になります。iterateeがnullの場合、unzipのように動作するためです。

// 入力がnullまたはundefinedの場合
const result3 = unzipWith(null);
// result3は[]になります。入力配列がnullのためです。

// 配列風オブジェクトを使用する例
const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 };
const result4 = unzipWith(arrayLike, (a, b) => a + b);
// result4は[4, 6]になります。配列風オブジェクトも処理できるためです。
```
