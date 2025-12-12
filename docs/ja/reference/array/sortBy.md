# sortBy

与えられた基準に従ってオブジェクト配列を昇順にソートした新しい配列を返します。

```typescript
const sorted = sortBy(arr, criteria);
```

## 使用法

### `sortBy(arr, criteria)`

オブジェクト配列を複数のプロパティまたは計算された値を基準にソートしたい場合は `sortBy` を使用してください。プロパティ名または変換関数を配列で提供すると、その順序で優先順位を付けて昇順にソートします。テーブルデータをソートしたり、複雑なソートロジックが必要なときに便利です。

```typescript
import { sortBy } from 'es-toolkit/array';

// 単一のプロパティでソートします。
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 35 },
];
const byAge = sortBy(users, ['age']);
// Returns: [{ name: 'jane', age: 25 }, { name: 'john', age: 30 }, { name: 'bob', age: 35 }]

// 複数のプロパティでソートします。
const employees = [
  { name: 'john', department: 'engineering', age: 30 },
  { name: 'jane', department: 'hr', age: 25 },
  { name: 'bob', department: 'engineering', age: 35 },
  { name: 'alice', department: 'engineering', age: 25 },
];
const sorted = sortBy(employees, ['department', 'age']);
// Returns: 部署が最初、次に年齢順でソート
// [
//   { name: 'alice', department: 'engineering', age: 25 },
//   { name: 'john', department: 'engineering', age: 30 },
//   { name: 'bob', department: 'engineering', age: 35 },
//   { name: 'jane', department: 'hr', age: 25 }
// ]
```

関数を使用して複雑なソート基準を作成できます。

```typescript
import { sortBy } from 'es-toolkit/array';

// 関数とプロパティを混ぜて使用します。
const products = [
  { name: 'laptop', price: 1000, category: 'electronics' },
  { name: 'shirt', price: 50, category: 'clothing' },
  { name: 'phone', price: 800, category: 'electronics' },
];

const sorted = sortBy(products, [
  'category',
  item => -item.price, // 価格は降順で
]);
// Returns: カテゴリが最初、次に価格の高い順でソート

// 計算された値でソートします。
const words = ['hello', 'a', 'wonderful', 'world'];
const byLength = sortBy(
  words.map(word => ({ word, length: word.length })),
  ['length']
);
// Returns: 文字列の長さ順でソートされたオブジェクト配列
```

#### パラメータ

- `arr` (`readonly T[]`): ソートするオブジェクト配列です。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): ソート基準です。オブジェクトのプロパティ名または変換関数の配列で、前にある基準が優先順位が高くなります。

#### 戻り値

(`T[]`): 指定された基準に従って昇順にソートされた新しい配列を返します。
