# sortBy (Lodash 互換性)

::: warning `Array.prototype.sort` メソッドを使用してください

この `sortBy` 関数は、さまざまなタイプの条件処理とオブジェクトサポートにより複雑に動作します。

代わりに、より速く現代的な `Array.prototype.sort` メソッドを使用してください。

:::

複数の基準に従って配列を昇順にソートします。

```typescript
const sorted = sortBy(collection, ...iteratees);
```

## 参照

### `sortBy(collection, ...iteratees)`

複数の基準を使用して配列またはオブジェクトを昇順にソートする場合は `sortBy` を使用してください。各要素に対してソート基準関数を実行し、その結果値を基準にソートします。

```typescript
import { sortBy } from 'es-toolkit/compat';

// ユーザーを名前でソートします。
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

sortBy(users, ['user']);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]

// 関数を使用してソートします。
sortBy(users, [
  function (o) {
    return o.user;
  },
]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```

複数の基準を同時に使用することもできます。

```typescript
import { sortBy } from 'es-toolkit/compat';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

// 名前で最初にソートし、次に年齢でソートします。
sortBy(users, ['user', item => item.age]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]
```

`null` や `undefined` は空の配列として処理されます。

```typescript
import { sortBy } from 'es-toolkit/compat';

sortBy(null, ['key']); // []
sortBy(undefined, ['key']); // []
```

#### パラメータ

- `collection` (`ArrayLike<T> | object | null | undefined`): ソートする配列またはオブジェクトです。
- `...iteratees` (`Array<Many<ListIteratee<T> | ObjectIteratee<T>>>`): ソート基準を決定する関数またはプロパティ名です。

#### 戻り値

(`T[]`): 昇順にソートされた新しい配列を返します。
