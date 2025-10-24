# uniqBy

変換関数が返す値を基準に、配列から重複した要素を除いた新しい配列を返します。

```typescript
const uniqueArray = uniqBy(arr, mapper);
```

## 参照

### `uniqBy(arr, mapper)`

配列の要素を特定の基準で変換して重複を判断したい場合は `uniqBy` を使用してください。変換関数が同じ値を返す要素のうち最初に現れるものだけを残します。

```typescript
import { uniqBy } from 'es-toolkit/array';

// 小数を切り捨てて重複を除きます。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// オブジェクト配列で特定のプロパティを基準に重複を除きます。
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 文字列の長さを基準に重複を除きます。
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

複雑なオブジェクトでも特定のフィールドの組み合わせを基準にできます。

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// カテゴリを基準に重複を除きます。
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### パラメータ

- `arr` (`readonly T[]`): 重複を除く配列です。
- `mapper` (`(item: T) => U`): 各要素を比較する値に変換する関数です。

#### 戻り値

(`T[]`): 変換関数の結果を基準に重複が除かれた新しい配列です。元の配列で最初に現れる順序を保持します。
