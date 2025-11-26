# uniqBy

セレクター関数または特定のプロパティキーを基準に重複要素を除いた新しい配列を返します。

```typescript
const uniqueArray = uniqBy(arr, selector);
```

## 使用法

### `uniqBy(arr, selector)`

特定の基準で重複を判定したいときに `uniqBy` を使用してください。セレクターが同じ値を返す要素のうち最初に出現したものだけを残します。セレクターは次のいずれかです。

- 各要素を比較値に変換する関数
- 要素のプロパティキー(例: `'id'`, `'age'`)

```typescript
import { uniqBy } from 'es-toolkit/array';

// 小数を切り捨てて重複を除きます。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// セレクター関数で特定のプロパティを基準にします。
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 同じ処理をプロパティキーだけで書くこともできます。
const uniqueByAgeKey = uniqBy(users, 'age');
console.log(uniqueByAgeKey);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 文字列の長さを基準に重複を除きます。
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

複雑なオブジェクトでも複数フィールドの組み合わせを基準にできます。

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// カテゴリで重複を除外(セレクター関数)
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]

// プロパティキーだけでも同じ結果になります。
const uniqueByCategoryKey = uniqBy(products, 'category');
console.log(uniqueByCategoryKey.length); // 2
console.log(uniqueByCategoryKey);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### パラメータ

- `arr` (`readonly T[]`): 重複を除外する対象の配列です。
- `selector` (`((item: T) => U) | keyof T`):
  - 各要素を比較値へ変換する関数、または
  - 重複判定に使うプロパティキーです。

#### 戻り値

(`T[]`): セレクターの結果を基準に重複を除いた新しい配列です。元の配列で最初に現れる順序を保持します。
