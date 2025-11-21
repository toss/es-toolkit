# differenceBy (Lodash 互換性)

::: warning `es-toolkit`の`differenceBy`を使用してください

この `differenceBy` 関数は、複雑な引数処理と反復子変換により、動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [differenceBy](../../array/differenceBy.md) を使用してください。

:::

反復関数で変換した値を基準に、最初の配列から他の配列の要素を除いた差集合を求めます。

```typescript
const result = differenceBy(array, ...values, iteratee);
```

## 使用法

### `differenceBy(array, ...values, iteratee)`

最初の配列の各要素と除外する配列の要素を反復関数で変換した後、同じ値になる要素を削除したい場合、`differenceBy` を使用してください。オブジェクト配列で特定のプロパティ値や変換された値を基準に比較する際に便利です。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 小数点以下切り捨てで比較
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// Returns: [1.2] (Math.floor(2.1) === Math.floor(2.3)のため2.1を除外)

// 文字列の長さで比較
differenceBy(['one', 'two', 'three'], ['four', 'eight'], 'length');
// Returns: ['one', 'two'] (threeとeightは長さが同じためthreeを除外)

// オブジェクトのプロパティで比較
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [{ id: 1, name: 'Different Alice' }];
differenceBy(users1, users2, 'id');
// Returns: [{ id: 2, name: 'Bob' }] (idが1のオブジェクトを除外)
```

複数の配列を一度に除外できます。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 複数の配列から除外
differenceBy([2.1, 1.2, 3.5], [2.3], [1.4], [3.2], Math.floor);
// Returns: [] (すべての要素が除外されます)

// 文字列配列を長さで比較
differenceBy(['a', 'bb', 'ccc'], ['x'], ['yy'], ['zzz'], 'length');
// Returns: [] (長さ1、2、3がすべて除外されます)
```

反復関数がない場合、通常の `difference` のように動作します。

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 反復関数なしで使用
differenceBy([1, 2, 3], [2, 4]);
// Returns: [1, 3]
```

`null` や `undefined` の配列は空配列として処理されます。

```typescript
import { differenceBy } from 'es-toolkit/compat';

differenceBy(null, [1, 2], Math.floor);
// Returns: []

differenceBy(undefined, [1, 2], x => x);
// Returns: []
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 差集合を求める基準配列です。
- `values` (`...ArrayLike<T>[]`): 除外する値を含む配列です。
- `iteratee` (`ValueIteratee<T>`): 各要素を比較する値に変換する関数です。関数、プロパティ名、または部分オブジェクトを使用できます。

#### 戻り値

(`T[]`): 反復関数で変換した値を基準に除外された要素を除いた新しい配列を返します。
