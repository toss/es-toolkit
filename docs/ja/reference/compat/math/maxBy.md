# maxBy (Lodash 互換性)

::: warning es-toolkitの[maxBy](../../array/maxBy.md)を使用してください

この `maxBy` 関数はiteratee関数処理と型変換により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [maxBy](../../array/maxBy.md) を使用してください。

:::

条件に合う値の中から最大値要素を見つけます。

```typescript
const maxItem = maxBy(array, iteratee);
```

## 使用法

### `maxBy(array, iteratee)`

配列から関数で計算した値が最も大きい要素を見つけます。

```typescript
import { maxBy } from 'es-toolkit/compat';

// オブジェクト配列から特定のプロパティが最大の要素
const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 },
];

maxBy(people, person => person.age);
// Returns: { name: '이영희', age: 35 }

// プロパティ名でも可能
maxBy(people, 'age');
// Returns: { name: '이영희', age: 35 }
```

関数で値を変換して最大値を見つけます。

```typescript
import { maxBy } from 'es-toolkit/compat';

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
maxBy(items, x => x.a);
// Returns: { a: 3 }

const numbers = [-1, -2, -3];
maxBy(numbers, x => Math.abs(x));
// Returns: -3 (絶対値が最も大きい要素)
```

配列要素でアクセスします。

```typescript
import { maxBy } from 'es-toolkit/compat';

const arrays = [
  [1, 2],
  [3, 4],
  [0, 5],
];
maxBy(arrays, 0); // 最初の要素が最大の配列
// Returns: [3, 4]

maxBy(arrays, 1); // 2番目の要素が最大の配列
// Returns: [0, 5]
```

オブジェクトの特定プロパティと値が一致する場合を見つけます。

```typescript
import { maxBy } from 'es-toolkit/compat';

const users = [
  { name: '홍길동', age: 25, active: true },
  { name: '김철수', age: 30, active: false },
  { name: '이영희', age: 35, active: true },
];

// activeがtrueの要素の中から最初のもの
maxBy(users, ['active', true]);
// Returns: { name: '홍길동', age: 25, active: true }

// オブジェクトで条件指定
maxBy(users, { active: true });
// Returns: { name: '홍길동', age: 25, active: true }
```

空の配列はundefinedを返します。

```typescript
import { maxBy } from 'es-toolkit/compat';

maxBy([], x => x.a);
// Returns: undefined

maxBy(null);
// Returns: undefined

maxBy(undefined);
// Returns: undefined
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検索する配列です。
- `iteratee` (`ValueIteratee<T>`, オプション): 各要素に適用する関数、プロパティ名、または条件です。

#### 戻り値

(`T | undefined`): 条件に合う値が最も大きい要素を返します。空の配列の場合は `undefined` を返します。
