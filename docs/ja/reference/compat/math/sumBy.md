# sumBy (Lodash 互換性)

::: warning es-toolkitの[sumBy](../../math/sumBy.md)を使用してください

この`sumBy`関数はiteratee関数処理と型変換により動作が遅いです。

代わりにより高速で現代的な`es-toolkit`の[sumBy](../../math/sumBy.md)を使用してください。

:::

条件に合う値を足します。

```typescript
const total = sumBy(array, iteratee);
```

## 参照

### `sumBy(array, iteratee)`

配列の各要素に関数を適用した結果を足します。

```typescript
import { sumBy } from 'es-toolkit/compat';

// 数値配列
sumBy([1, 2, 3], value => value);
// Returns: 6

sumBy([1.5, 2.5, 3.5], value => Math.floor(value));
// Returns: 6 (1 + 2 + 3)

// 空配列
sumBy([], value => value);
// Returns: 0
```

### `sumBy(array)`

関数を渡さない場合、配列の値をそのまま足します。

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, 2, 3]);
// Returns: 6

sumBy([1n, 2n, 3n]);
// Returns: 6n
```

オブジェクト配列から特定のプロパティを足します。

```typescript
import { sumBy } from 'es-toolkit/compat';

const people = [
  { name: '田中太郎', age: 25 },
  { name: '佐藤次郎', age: 30 },
  { name: '鈴木花子', age: 35 },
];

sumBy(people, person => person.age);
// Returns: 90

// プロパティ名でも可能
sumBy(people, 'age');
// Returns: 90
```

文字列も連結します。

```typescript
import { sumBy } from 'es-toolkit/compat';

const items = [{ a: '1' }, { a: '2' }];
sumBy(items, obj => obj.a);
// Returns: '12'
```

無効な値は無視します。

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, undefined, 2], value => value);
// Returns: 3 (undefinedを無視)

sumBy(null);
// Returns: 0

sumBy(undefined);
// Returns: 0
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 処理する配列です。
- `iteratee` (`((value: T) => number) | string`, オプション): 各要素に適用する関数またはプロパティ名です。

#### 戻り値

(`number`): 条件に合う値を足した合計を返します。
