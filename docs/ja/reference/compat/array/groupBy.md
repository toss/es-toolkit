# groupBy (Lodash 互換性)

::: warning `es-toolkit`の[groupBy](../../array/groupBy.md)を使用してください

この`groupBy`関数は、`null`や`undefined`の処理、オブジェクトのサポート、複雑な型処理などにより、動作が遅くなります。

代わりに、より高速でモダンな`es-toolkit`の[groupBy](../../array/groupBy.md)を使用してください。

:::

配列またはオブジェクトの要素を与えられた条件に従ってグループ化します。

```typescript
const grouped = groupBy(collection, iteratee);
```

## 参照

### `groupBy(collection, iteratee)`

配列またはオブジェクトの各要素を与えられた条件関数に従ってグループ化し、グループ別に分類されたオブジェクトを返します。条件は関数、プロパティ名、部分オブジェクトなど、さまざまな形式で提供できます。

```typescript
import { groupBy } from 'es-toolkit/compat';

// 関数でグループ化
const array = [6.1, 4.2, 6.3];
const result = groupBy(array, Math.floor);
// resultは{ '4': [4.2], '6': [6.1, 6.3] }

// プロパティ名でグループ化
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 30 },
];
const byAge = groupBy(users, 'age');
// byAgeは{ '25': [{ name: 'jane', age: 25 }], '30': [{ name: 'john', age: 30 }, { name: 'bob', age: 30 }] }

// オブジェクトからグループ化
const obj = { a: 6.1, b: 4.2, c: 6.3 };
const groupedObj = groupBy(obj, Math.floor);
// groupedObjは{ '4': [4.2], '6': [6.1, 6.3] }
```

`null`または`undefined`は空のオブジェクトとして扱われます。

```typescript
import { groupBy } from 'es-toolkit/compat';

groupBy(null, x => x); // {}
groupBy(undefined, x => x); // {}
```

部分オブジェクトやプロパティ-値ペアでもグループ化できます。

```typescript
import { groupBy } from 'es-toolkit/compat';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// 部分オブジェクトでグループ化
const byCategory = groupBy(products, { category: 'fruit' });
// プロパティ-値ペアでグループ化
const byName = groupBy(products, ['name', 'apple']);
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, T> | null | undefined`): グループ化する配列またはオブジェクトです。
- `iteratee` (`Function | PropertyKey | Array | Object`, 選択): グループ化する条件です。関数、プロパティ名、プロパティ-値ペア、または部分オブジェクトを指定できます。デフォルトは`identity`関数です。

#### 戻り値

(`Record<string, T[]>`): 各キーがグループの条件値で、値がそのグループに属する要素の配列であるオブジェクトを返します。
