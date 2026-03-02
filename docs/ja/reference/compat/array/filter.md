# filter (Lodash 互換性)

::: warning `Array.prototype.filter()` を使用してください

この `filter` 関数は、複雑なオブジェクト処理、様々な条件形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `Array.prototype.filter()` を使用してください。

:::

与えられた条件を満たす要素で新しい配列を作ります。

```typescript
const result = filter(collection, predicate);
```

## 使用法

### `filter(collection, predicate)`

配列またはオブジェクトから特定の条件を満たす要素だけをフィルタリングしたい場合に `filter` を使用します。条件は関数、部分オブジェクト、プロパティ-値ペア、プロパティ名など、様々な形式で指定できます。

```typescript
import { filter } from 'es-toolkit/compat';

// 検査関数を使用
const numbers = [1, 2, 3, 4, 5];
filter(numbers, x => x % 2 === 0);
// 戻り値: [2, 4]

// プロパティ名を使用
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];
filter(users, 'active');
// 戻り値: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// 部分オブジェクトを使用
filter(users, { active: true });
// 戻り値: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// プロパティ-値ペアを使用
filter(users, ['active', true]);
// 戻り値: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
```

オブジェクトに対しても同じように動作し、条件を満たす値の配列を返します。

```typescript
import { filter } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
filter(scores, score => score >= 80);
// 戻り値: [90, 85]
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { filter } from 'es-toolkit/compat';

filter(null, x => x > 0);
// 戻り値: []

filter(undefined, x => x > 0);
// 戻り値: []
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): フィルタリングする配列またはオブジェクトです。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): フィルタリング条件です。関数、部分オブジェクト、プロパティ-値ペア、プロパティ名を使用できます。

#### 戻り値

(`T[]`): 条件を満たす要素で構成された新しい配列を返します。
