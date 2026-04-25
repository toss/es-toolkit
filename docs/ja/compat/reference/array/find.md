# find (Lodash 互換性)

::: warning `Array.prototype.find()` を使用してください

この `find` 関数は、複雑なオブジェクト処理、様々な条件形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `Array.prototype.find()` を使用してください。

:::

配列またはオブジェクトから条件に合う最初の要素を探します。

```typescript
const result = find(collection, predicate, fromIndex);
```

## 使用法

### `find(collection, predicate, fromIndex?)`

配列またはオブジェクトから特定の条件を満たす最初の要素を探したい場合に `find` を使用します。条件は関数、部分オブジェクト、プロパティ-値ペア、プロパティ名など、様々な形式で指定できます。

```typescript
import { find } from 'es-toolkit/compat';

// 検査関数を使用
const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 3);
// 戻り値: 4

// プロパティ名を使用
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
];
find(users, 'active');
// 戻り値: { name: 'Bob', active: true }

// 部分オブジェクトを使用
find(users, { active: true });
// 戻り値: { name: 'Bob', active: true }

// プロパティ-値ペアを使用
find(users, ['name', 'Charlie']);
// 戻り値: { name: 'Charlie', active: true }
```

開始インデックスを指定できます。

```typescript
import { find } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 2, 2);
// 戻り値: 3 (インデックス2から検索開始)
```

オブジェクトに対しても同じように動作します。

```typescript
import { find } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
find(scores, score => score >= 80);
// 戻り値: 90
```

`null` または `undefined` は空のコレクションとして処理され `undefined` を返します。

```typescript
import { find } from 'es-toolkit/compat';

find(null, x => x > 0);
// 戻り値: undefined

find(undefined, x => x > 0);
// 戻り値: undefined
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 検索する配列またはオブジェクトです。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): 検索条件です。関数、部分オブジェクト、プロパティ-値ペア、プロパティ名を使用できます。
- `fromIndex` (`number`, オプション): 検索を開始するインデックスです。デフォルトは `0` です。

#### 戻り値

(`T | undefined`): 条件を満たす最初の要素を返します。見つからなければ `undefined` を返します。
