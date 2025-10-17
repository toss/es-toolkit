# reduce (Lodash 互換性)

::: warning `Array.prototype.reduce`または`Object.values`と`reduce`を使用してください

この`reduce`関数は、複雑な型処理と様々な入力形式のサポートにより、動作が遅くなります。

代わりに、より高速で現代的な`Array.prototype.reduce`メソッド、またはオブジェクトの場合は`Object.values`と一緒に使用してください。

:::

配列またはオブジェクトを1つの値に縮小します。

```typescript
const result = reduce(collection, iteratee, initialValue);
```

## 参照

### `reduce(collection, iteratee, initialValue)`

配列またはオブジェクトのすべての要素を1つずつ反復処理しながら累積値を計算します。初期値を提供するとその値から始まり、そうでない場合は最初の要素から始まります。

```typescript
import { reduce } from 'es-toolkit/compat';

// 配列の合計を計算
const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value, 0);
console.log(sum); // 10

// オブジェクト値の合計を計算
const scores = { math: 95, english: 87, science: 92 };
const totalScore = reduce(scores, (acc, value) => acc + value, 0);
console.log(totalScore); // 274
```

初期値を提供しない場合、最初の要素が初期値となり、2番目の要素から反復処理を開始します。

```typescript
import { reduce } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (1 + 2 + 3 + 4)

// 空の配列はundefinedを返します
const empty = [];
const result = reduce(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### パラメータ

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 反復処理する配列またはオブジェクトです。
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): 各要素に対して呼び出す関数です。累積値、現在の値、インデックス/キー、元の配列/オブジェクトを受け取ります。
- `initialValue` (`any`, オプション): 累積値の初期値です。提供しない場合、最初の要素が初期値になります。

#### 戻り値

(`any`): すべての要素を処理した後の最終累積値を返します。
