# intersectionBy (Lodash 互換性)

::: warning `es-toolkit`の[intersectionBy](../../array/intersectionBy.md)を使用してください

この`intersectionBy`関数は、複雑な条件処理、複数配列のサポート、プロパティパスの解析などにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[intersectionBy](../../array/intersectionBy.md)を使用してください。

:::

与えられた条件関数を使用して複数の配列の共通部分を求めます。

```typescript
const result = intersectionBy(...arrays, iteratee);
```

## 参照

### `intersectionBy(...arrays, iteratee)`

複数の配列で、各要素を与えられた条件関数で変換した値を基準に共通部分を求めます。条件は関数、プロパティ名、部分オブジェクトなど、さまざまな形式で提供できます。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

// 関数で共通部分を求める
const array1 = [2.1, 1.2];
const array2 = [2.3, 3.4];
const result = intersectionBy(array1, array2, Math.floor);
// resultは[2.1]（Math.floor基準で2が共通）

// プロパティで共通部分を求める
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const byId = intersectionBy(users1, users2, 'id');
// byIdは[{ id: 2, name: 'jane' }]

// 3つの配列の共通部分
const array3 = [2.5, 4.1];
const multiResult = intersectionBy(array1, array2, array3, Math.floor);
// multiResultは[2.1]

// 配列のようなオブジェクト
const arrayLike1 = { 0: { x: 1 }, 1: { x: 2 }, length: 2 };
const arrayLike2 = { 0: { x: 2 }, 1: { x: 3 }, length: 2 };
const byProperty = intersectionBy(arrayLike1, arrayLike2, 'x');
// byPropertyは[{ x: 2 }]
```

`null`または`undefined`配列は空の配列として扱われます。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [{ x: 1 }, { x: 2 }];
const result = intersectionBy(array1, null, 'x');
// resultは[]
```

部分オブジェクトやプロパティ-値ペアでも条件を指定できます。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const products1 = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
];
const products2 = [
  { category: 'fruit', name: 'banana' },
  { category: 'meat', name: 'beef' },
];

// 部分オブジェクトで条件を指定
const byCategory = intersectionBy(products1, products2, { category: 'fruit' });
// プロパティ-値ペアで条件を指定
const byCategoryPair = intersectionBy(products1, products2, ['category', 'fruit']);
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 共通部分を求める配列です。
- `iteratee` (`Function | PropertyKey | Array | Object`): 各要素を変換する条件です。関数、プロパティ名、プロパティ-値ペア、または部分オブジェクトを指定できます。

#### 戻り値

(`T[]`): 変換された値を基準にすべての配列で共通に存在する要素の新しい配列を返します。
