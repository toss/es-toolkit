# every (Lodash 互換性)

::: warning `Array.prototype.every()` を使用してください

この `every` 関数は、複雑なオブジェクト処理、様々な条件形式のサポートなどにより遅く動作します。

代わりに、より高速で現代的な `Array.prototype.every()` を使用してください。

:::

配列またはオブジェクトのすべての値が与えられた条件に合うかを返します。

```typescript
const result = every(collection, predicate);
```

## 参照

### `every(collection, predicate?)`

配列またはオブジェクトのすべての要素が特定の条件を満たすか確認したい場合に `every` を使用します。条件は関数、部分オブジェクト、プロパティ-値ペア、プロパティ名など、様々な形式で指定できます。

```typescript
import { every } from 'es-toolkit/compat';

// 検査関数を使用
const numbers = [2, 4, 6, 8];
every(numbers, x => x % 2 === 0);
// 戻り値: true

// プロパティ名を使用
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
];
every(users, 'active');
// 戻り値: true

// 部分オブジェクトを使用
every(users, { active: true });
// 戻り値: true

// プロパティ-値ペアを使用
every(users, ['active', true]);
// 戻り値: true
```

オブジェクトに対しても同じように動作します。

```typescript
import { every } from 'es-toolkit/compat';

const scores = { math: 90, english: 85, science: 92 };
every(scores, score => score >= 80);
// 戻り値: true
```

`null` または `undefined` は空のコレクションとして処理され `true` を返します。

```typescript
import { every } from 'es-toolkit/compat';

every(null);
// 戻り値: true

every(undefined);
// 戻り値: true
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): 検査する配列またはオブジェクトです。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, オプション): 検査条件です。関数、部分オブジェクト、プロパティ-値ペア、プロパティ名を使用できます。デフォルトは `identity` 関数です。

#### 戻り値

(`boolean`): すべての要素が条件を満たせば `true`、そうでなければ `false` を返します。
