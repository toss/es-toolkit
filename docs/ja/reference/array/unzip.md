# unzip

結合されている配列を解いて、同じ位置の要素同士で新しい配列を作って返します。

```typescript
const unzippedArrays = unzip(zipped);
```

## 参照

### `unzip(zipped)`

複数の配列が結合されている2次元配列から同じインデックスにある要素を集めて新しい配列を作りたい場合は `unzip` を使用してください。zipの逆の動作です。

```typescript
import { unzip } from 'es-toolkit/array';

// 文字列、真偽値、数値が結合された配列を解きます。
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
  ['c', true, 3]
];
const result = unzip(zipped);
console.log(result);
// [['a', 'b', 'c'], [true, false, true], [1, 2, 3]]

// ユーザー情報が結合された配列を解きます。
const users = [
  ['john', 30, 'engineer'],
  ['jane', 25, 'designer'],
  ['bob', 35, 'manager']
];
const [names, ages, roles] = unzip(users);
console.log(names); // ['john', 'jane', 'bob']
console.log(ages); // [30, 25, 35]
console.log(roles); // ['engineer', 'designer', 'manager']
```

長さが異なる配列も処理できます。短い配列の場合は `undefined` で埋められます。

```typescript
import { unzip } from 'es-toolkit/array';

const mixed = [
  [1, 'a'],
  [2, 'b', true],
  [3]
];
const result = unzip(mixed);
console.log(result);
// [[1, 2, 3], ['a', 'b', undefined], [undefined, true, undefined]]
```

空の配列を渡すと空の配列を返します。

```typescript
import { unzip } from 'es-toolkit/array';

const empty = unzip([]);
console.log(empty); // []
```

#### パラメータ

- `zipped` (`ReadonlyArray<[...T]>`): 解く配列が結合されている2次元配列です。

#### 戻り値

(`Unzip<T>`): 同じ位置の要素同士が結合された新しい配列です。元の配列の長さが異なる場合、短い配列の空いた場所は `undefined` で埋められます。
