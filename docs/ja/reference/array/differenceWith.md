# differenceWith

引数として提供された比較関数に従って、2つの配列の差分を計算します。

この関数は2つの配列と比較関数を受け取ります。この比較関数を使用して要素が同じかどうかを比較し、最初の配列にあるが2番目の配列にはない要素を含む新しい配列を返します。

## インターフェース

```typescript
function differenceWith<T, U>(firstArr: T[], secondArr: U[], areItemsEqual: (x: T, y: U) => boolean): T[];
```

### パラメータ

- `firstArr` (`T[]`): 差分を計算する配列です。この配列が主な配列で、この配列の要素が比較されフィルタリングされます。
- `secondArr` (`U[]`): 最初の配列から除外する要素を含む配列です。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 2つの要素が同じかどうかを決定する関数です。

### 戻り値

(`T[]`) 比較関数に基づいて、最初の配列にはあるが2番目の配列には存在しないと判断された要素を含む新しい配列です。

## 例

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// resultは[{ id: 1 }, { id: 3 }]になります。idが2の要素は同じと見なされ、結果から除外されます。

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [2, 4];
const areItemsEqual = (a, b) => a.id === b;
const result = differenceWith(array1, array2, areItemsEqual);
// resultは[{ id: 1 }, { id: 3 }]になります。idが2の要素は2番目の配列の要素と同じと見なされ、結果から除外されます。
```

## Lodashとの互換性

`es-toolkit/compat`から`differenceWith`をインポートすると、lodashと互換性があります。

- `differenceWith`は、最初の配列と比較するための複数の配列を受け取ることができます。
- `differenceWith`は、配列風オブジェクト(Array-like object)も引数として受け取ることができます。
- `differenceWith`はカスタム比較関数を省略することができます。省略した場合、デフォルトで[SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero)アルゴリズムが使用されます。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 例1: 複数の配列を比較し、比較関数を使用する場合
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// 結果は [{ id: 1 }] です。この要素は比較基準に基づいて最初の配列にのみ存在します。

// 例2: 配列風オブジェクトを引数として受け取り、比較関数を使用する場合
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// 結果は [{ id: 1 }] です。この要素は比較基準に基づいて最初の配列風オブジェクトにのみ存在します。

// 例3: カスタム比較関数を省略
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// 結果は [1] です。この要素はすべての配列に一意に存在します。
```
