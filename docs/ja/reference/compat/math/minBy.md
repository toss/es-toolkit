# minBy (Lodash 互換性)

::: warning es-toolkitの[minBy](../../array/minBy.md)を使用してください

この `minBy` 関数はiteratee関数処理と型変換により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [minBy](../../array/minBy.md) を使用してください。

:::

条件に合致する値の中で最小値要素を見つけます。

```typescript
const minItem = minBy(array, iteratee);
```

## 使用法

### `minBy(array, iteratee)`

配列から関数で計算した値が最小の要素を見つけます。

```typescript
import { minBy } from 'es-toolkit/compat';

// オブジェクト配列から特定のプロパティが最小の要素
const people = [
  { name: 'ホンギルドン', age: 25 },
  { name: 'キムチョルス', age: 30 },
  { name: 'イヨンヒ', age: 35 },
];

minBy(people, person => person.age);
// Returns: { name: 'ホンギルドン', age: 25 }

// プロパティ名でも可能
minBy(people, 'age');
// Returns: { name: 'ホンギルドン', age: 25 }
```

関数で値を変換して最小値を見つけます。

```typescript
import { minBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
minBy(items, x => x.a);
// Returns: { a: 1 }

const numbers = [-1, -2, -3];
minBy(numbers, x => Math.abs(x));
// Returns: -1 (絶対値が最小の要素)
```

配列要素でアクセスします。

```typescript
import { minBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
minBy(arrays, 0); // 最初の要素が最小の配列
// Returns: [0, 5]

minBy(arrays, 1); // 2番目の要素が最小の配列
// Returns: [1, 2]
```

オブジェクトの特定プロパティと値が一致する場合を見つけます。

```typescript
import { minBy } from 'es-toolkit/compat';

const users = [
  { name: 'ホンギルドン', age: 25, active: true },
  { name: 'キムチョルス', age: 30, active: false },
  { name: 'イヨンヒ', age: 35, active: true },
];

// activeがtrueの要素の中で最初ではないものを見つける
minBy(users, ['active', true]);
// Returns: { name: 'キムチョルス', age: 30, active: false }

// オブジェクトで条件を指定
minBy(users, { active: true });
// Returns: { name: 'キムチョルス', age: 30, active: false }
```

空の配列はundefinedを返します。

```typescript
import { minBy } from 'es-toolkit/compat';

minBy([], x => x.a);
// Returns: undefined

minBy(null);
// Returns: undefined

minBy(undefined);
// Returns: undefined
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検索する配列です。
- `iteratee` (`ValueIteratee<T>`, オプション): 各要素に適用する関数、プロパティ名、または条件です。

#### 戻り値

(`T | undefined`): 条件に合致する値が最小の要素を返します。空の配列の場合は `undefined` を返します。
