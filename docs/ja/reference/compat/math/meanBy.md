# meanBy (Lodash 互換性)

::: warning es-toolkitの[meanBy](../../math/meanBy.md)を使用してください

この `meanBy` 関数はiteratee関数処理と型変換により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [meanBy](../../math/meanBy.md) を使用してください。

:::

条件に合う値の平均を計算します。

```typescript
const average = meanBy(array, iteratee);
```

## 参照

### `meanBy(array, iteratee)`

配列の各要素に関数を適用した結果の平均を計算します。

```typescript
import { meanBy } from 'es-toolkit/compat';

// オブジェクト配列から特定プロパティの平均
const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 },
];

meanBy(people, person => person.age);
// Returns: 30

// プロパティ名でも可能
meanBy(people, 'age');
// Returns: 30
```

関数で値を変換して平均を計算します。

```typescript
import { meanBy } from 'es-toolkit/compat';

const numbers = [1.5, 2.7, 3.2, 4.8];
meanBy(numbers, x => Math.floor(x));
// Returns: 2.5 (1 + 2 + 3 + 4) / 4

const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
meanBy(items, x => x.a);
// Returns: 2
```

配列要素でアクセスします。

```typescript
import { meanBy } from 'es-toolkit/compat';

const arrays = [[2], [3], [1]];
meanBy(arrays, 0); // 最初の要素の平均
// Returns: 2
```

オブジェクトの特定プロパティと値が一致する場合のみ計算します。

```typescript
import { meanBy } from 'es-toolkit/compat';

const users = [
  { name: '홍길동', age: 25, active: true },
  { name: '김철수', age: 30, active: false },
  { name: '이영희', age: 35, active: true },
];

// activeがtrueの人のみ
meanBy(users, { active: true });
// Returns: 0.6666666 (active が true の人の割合)
```

空の配列はNaNを返します。

```typescript
import { meanBy } from 'es-toolkit/compat';

meanBy([], x => x.a);
// Returns: NaN

meanBy(null);
// Returns: NaN

meanBy(undefined);
// Returns: NaN
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 処理する配列です。
- `iteratee` (`ValueIteratee<T>`, オプション): 各要素に適用する関数、プロパティ名、または条件です。

#### 戻り値

(`number`): 条件に合う値の平均を返します。空の配列の場合は `NaN` を返します。
