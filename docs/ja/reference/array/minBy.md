# minBy

変換関数が返す値を基準に、配列で最小値を持つ要素を返します。

```typescript
const min = minBy(items, getValue);
```

## 使用法

### `minBy(items, getValue)`

配列の要素を変換関数で数値に変換し、最も小さな値を持つ元の要素を見つけたい場合は `minBy` を使用してください。空の配列の場合は `undefined` を返します。

```typescript
import { minBy } from 'es-toolkit/array';

// オブジェクト配列で特定のプロパティの最小値を持つ要素を見つけます。
const people = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 28 },
  { name: 'joe', age: 26 },
];
minBy(people, person => person.age);
// Returns: { name: 'joe', age: 26 }

// 数値配列で絶対値が最も小さい要素を見つけます。
const numbers = [-10, -5, 0, 5, 15];
minBy(numbers, x => Math.abs(x));
// Returns: 0
```

空の配列の場合は `undefined` を返します。

```typescript
import { minBy } from 'es-toolkit/array';

minBy([], x => x.value); // undefined
```

#### パラメータ

- `items` (`T[]`): 最小値を持つ要素を探す配列です。
- `getValue` (`(element: T, index: number, array: readonly T[]) => number`): 各要素を数値に変換する関数です。要素、インデックス、配列を引数として受け取ります。

#### 戻り値

(`T | undefined`): 変換関数が返した値の中で最も小さな値を持つ要素です。配列が空の場合は `undefined` を返します。
