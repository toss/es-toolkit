# orderBy

複数の基準と並び順に従って、配列をソートした新しい配列を返します。

```typescript
const sorted = orderBy(arr, criteria, orders);
```

## 使用法

### `orderBy(arr, criteria, orders)`

配列を複数の条件で複合ソートしたい場合は `orderBy` を使用してください。各条件ごとに昇順または降順を指定でき、前の条件で同じ値の場合は次の条件でソートします。

```typescript
import { orderBy } from 'es-toolkit/array';

// 文字列配列をソート
const strings = ['banana', 'apple', 'cherry'];
orderBy(strings, [], ['desc']);
// Returns: ['cherry', 'banana', 'apple']

// 文字列を長さでソート
const strings = ['banana', 'a', 'cherry'];
orderBy(strings, [x => x.length], ['asc']);
// Returns: ['a', 'cherry', 'banana']

// 大文字小文字を区別せずにソート
const strings = ['Banana', 'apple', 'Cherry'];
orderBy(strings, [x => x.toLowerCase()], ['asc']);
// Returns: ['apple', 'Banana', 'Cherry']

// 数値配列をソート
const numbers = [3, 1, 4, 1, 5, 9];
orderBy(numbers, [], ['desc']);
// Returns: [9, 5, 4, 3, 1, 1]

// 複数の基準でユーザー配列をソートします。
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// Returns:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ]

// プロパティ名と関数を混ぜて使用できます。
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 2.0 },
];

orderBy(products, ['category', product => product.name.length], ['asc', 'desc']);
// Returns: categoryでまずソートし、同じcategory内では名前の長さの降順でソート
```

並び順の数が条件より少ない場合、最後の並び順を繰り返し使用します。

```typescript
import { orderBy } from 'es-toolkit/array';

const data = [
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 2, c: 2 },
  { a: 2, b: 1, c: 1 },
];

orderBy(data, ['a', 'b', 'c'], ['asc', 'desc']);
// 'a'は昇順、'b'と'c'は降順でソートされます。
```

#### パラメータ

- `arr` (`readonly T[]`): ソートする配列です。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`, オプション): ソートする基準です。オブジェクトのプロパティ名または値を返す関数を使用できます。指定しないか空配列の場合、プリミティブ型の値そのものでソートします。
- `orders` (`Array<'asc' | 'desc'>`, オプション): 各基準に対する並び順の配列です。`'asc'`は昇順、`'desc'`は降順を意味します。デフォルトは `['asc']` です。

#### 戻り値

(`T[]`): 指定された基準と並び順に従ってソートされた新しい配列です。
