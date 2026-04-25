# differenceWith (Lodash 互換性)

::: warning `es-toolkit`の`differenceWith`を使用してください

この `differenceWith` 関数は、`null` や `undefined` の処理、複数の配列処理、`ArrayLike` 型の処理などにより、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [differenceWith](../../array/differenceWith.md) を使用してください。

:::

比較関数を使用して、最初の配列から他の配列に含まれる要素を削除します。

```typescript
const result = differenceWith(array, ...values, comparator);
```

## 使用法

### `differenceWith(array, ...values, comparator)`

各要素を比較関数で比較して差を求めたい場合、`differenceWith` を使用してください。最後の引数が比較関数になります。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// オブジェクトをidで比較します。
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const others = [{ id: 2 }];
const comparator = (a, b) => a.id === b.id;

differenceWith(objects, others, comparator);
// Returns: [{ id: 1 }, { id: 3 }]

// 複数の配列を一度に除外します。
const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];

differenceWith(array, values1, values2, comparator);
// Returns: [{ id: 1 }, { id: 4 }]
```

比較関数を提供しない場合、通常の `difference` のように動作します。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 比較関数なしで使用すると通常の比較を行います。
differenceWith([1, 2, 3], [2], [3]);
// Returns: [1]
```

複雑な比較ロジックも使用できます。

```typescript
import { differenceWith } from 'es-toolkit/compat';

const users = [
  { name: 'alice', age: 25 },
  { name: 'bob', age: 30 },
  { name: 'charlie', age: 35 },
];
const excludeUsers = [{ name: 'bob', age: 25 }]; // 異なる年齢

// 名前のみで比較します。
const compareByName = (a, b) => a.name === b.name;
differenceWith(users, excludeUsers, compareByName);
// Returns: [{ name: 'alice', age: 25 }, { name: 'charlie', age: 35 }]
// bobが除外されます（年齢が違っても名前が同じため）
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 差を求める基準配列です。
- `...values` (`Array<ArrayLike<T>>` + `(a: T, b: T) => boolean`): 除外する要素を含む配列と最後に比較関数です。

#### 戻り値

(`T[]`): 比較関数を使用して最初の配列から残りの配列の要素を削除した新しい配列を返します。
