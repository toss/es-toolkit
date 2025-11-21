# differenceWith

カスタム比較関数を使用して2つの配列の差集合を求め、新しい配列を返します。

```typescript
const result = differenceWith(firstArr, secondArr, areItemsEqual);
```

## 使用法

### `differenceWith(firstArr, secondArr, areItemsEqual)`

2つの配列の要素をカスタム関数で比較して差集合を求めたい場合は `differenceWith` を使用してください。比較関数を通じて2つの要素が同じかどうかを判断し、最初の配列にのみ存在する要素を返します。

```typescript
import { differenceWith } from 'es-toolkit/array';

// オブジェクト配列でidを基準に差集合を求めます。
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
differenceWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1 }, { id: 3 }]
// idが2の要素は同じと判断され除外されます。

// 異なる型の配列も比較できます。
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
const areItemsEqual2 = (a, b) => a.id === b;
differenceWith(objects, numbers, areItemsEqual2);
// Returns: [{ id: 1 }, { id: 3 }]
```

複雑な条件で要素を比較できます。

```typescript
import { differenceWith } from 'es-toolkit/array';

const users1 = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];
const users2 = [
  { name: 'Alice', age: 31 }, // 年齢が異なっても名前が同じなら同じユーザー
  { name: 'David', age: 25 },
];

const areUsersEqual = (a, b) => a.name === b.name;
differenceWith(users1, users2, areUsersEqual);
// Returns: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### パラメータ

- `firstArr` (`T[]`): 差集合を求める基準となる配列です。
- `secondArr` (`U[]`): 最初の配列から除外する要素を含む配列です。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 2つの要素が同じかどうかを判断する関数です。

#### 戻り値

(`T[]`): 比較関数に従って最初の配列にのみ存在すると判断された要素で構成される新しい配列です。

## Lodash互換性

`es-toolkit/compat` から `differenceWith` をインポートすると、Lodash と完全に互換になります。

- `differenceWith` は最初の配列と比較するために複数の配列を受け取ることができます。
- `differenceWith` は配列様オブジェクトを引数として受け取ることができます。
- `differenceWith` はカスタム比較関数を省略できます。省略すると、デフォルトで [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) アルゴリズムが使用されます。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 例1: 複数の配列と比較し、比較関数を使用する場合
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// 結果は [{ id: 1 }] です。この要素は比較基準に従って最初の配列にのみ残っています。

// 例2: 配列様オブジェクトを引数として受け取り、比較関数を使用する場合
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// 結果は [{ id: 1 }] です。この要素は比較基準に従って最初の配列様オブジェクトのみに残っています。

// 例3: カスタム比較関数を省略
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// 結果は [1] です。この要素はすべての配列で唯一存在します。
```
