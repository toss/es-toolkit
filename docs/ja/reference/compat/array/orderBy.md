# orderBy (Lodash 互換性)

::: warning `es-toolkit` の [orderBy](../../array/orderBy.md) を使用してください

この `orderBy` 関数は、`null` や `undefined` の処理、複雑なパス探索、様々なソート条件の処理により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [orderBy](../../array/orderBy.md) を使用してください。

:::

複数の条件でコレクションの要素をソートします。

```typescript
const result = orderBy(collection, criteria, orders);
```

## 参照

### `orderBy(collection, criteria, orders)`

指定された条件とソート順に従って、配列またはオブジェクトの要素をソートします。複数の条件を使用でき、各条件に対して昇順 (`'asc'`) または降順 (`'desc'`) のソートを指定できます。

```typescript
import { orderBy } from 'es-toolkit/compat';

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
];

// 名前昇順、年齢降順でソート
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// => [
//   { name: 'barney', age: 36 },
//   { name: 'barney', age: 34 },
//   { name: 'fred', age: 48 },
//   { name: 'fred', age: 40 }
// ]

// 関数でソート条件を指定
orderBy(users, [user => user.name, user => user.age], ['asc', 'desc']);
// => 上記と同じ結果

// 単一の条件でソート
orderBy(users, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'fred', age: 40 }, ...]
```

オブジェクトの場合、値をソートします。

```typescript
import { orderBy } from 'es-toolkit/compat';

const obj = {
  a: { name: 'fred', age: 48 },
  b: { name: 'barney', age: 34 },
};

orderBy(obj, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }]
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { orderBy } from 'es-toolkit/compat';

orderBy(null, 'name'); // []
orderBy(undefined, 'age'); // []
```

#### パラメータ

- `collection` (`ArrayLike<T> | object | null | undefined`): ソートする配列またはオブジェクトです。
- `criteria` (`Criterion<T> | Array<Criterion<T>>`, オプション): ソート条件です。プロパティ名、プロパティパス、関数などを使用できます。デフォルトは `[null]` です。
- `orders` (`unknown | unknown[]`, オプション): 各条件のソート順です。`'asc'`(昇順)、`'desc'`(降順)、`true`(昇順)、`false`(降順)を使用できます。デフォルトは `[]` です。

#### 戻り値

(`T[]`): 新しくソートされた配列を返します。
