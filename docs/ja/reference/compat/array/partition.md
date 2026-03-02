# partition (Lodash 互換性)

::: warning `es-toolkit` の [partition](../../array/partition.md) を使用してください

この `partition` 関数は、`null` や `undefined` の処理、様々な条件タイプにより動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [partition](../../array/partition.md) を使用してください。

:::

条件に基づいてコレクションの要素を2つのグループに分けます。

```typescript
const [truthy, falsy] = partition(collection, predicate);
```

## 使用法

### `partition(collection, predicate)`

与えられた条件関数に基づいて、配列またはオブジェクトの要素を2つのグループに分けます。最初のグループには条件が真である要素が含まれ、2番目のグループには条件が偽である要素が含まれます。

```typescript
import { partition } from 'es-toolkit/compat';

// 数値配列を偶数と奇数に分ける
partition([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
// => [[2, 4, 6], [1, 3, 5]]

// プロパティ名で条件を指定
const users = [
  { name: 'john', active: true },
  { name: 'jane', active: false },
  { name: 'bob', active: true },
];

partition(users, 'active');
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// オブジェクト条件でフィルタリング
partition(users, { active: true });
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// 配列条件でフィルタリング
partition(users, ['name', 'john']);
// => [
//   [{ name: 'john', active: true }],
//   [{ name: 'jane', active: false }, { name: 'bob', active: true }]
// ]
```

オブジェクトの場合、値を分割します。

```typescript
import { partition } from 'es-toolkit/compat';

const obj = {
  a: { score: 90 },
  b: { score: 40 },
  c: { score: 80 },
};

partition(obj, item => item.score >= 80);
// => [[{ score: 90 }, { score: 80 }], [{ score: 40 }]]
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { partition } from 'es-toolkit/compat';

partition(null, x => x > 0); // [[], []]
partition(undefined, 'active'); // [[], []]
```

#### パラメータ

- `collection` (`ArrayLike<T> | T | null | undefined`): 分割する配列またはオブジェクトです。
- `predicate` (`((value: T) => unknown) | Partial<T> | [PropertyKey, any] | PropertyKey`, オプション): 各要素をテストする条件です。関数、部分オブジェクト、プロパティ-値配列、またはプロパティ名を使用できます。デフォルトは `identity` です。

#### 戻り値

(`[T[], T[]]`): 条件を満たす要素の配列と満たさない要素の配列を含む配列を返します。
