# uniqWith

比較関数を使用して、配列から重複した要素を除いた新しい配列を返します。

```typescript
const uniqueArray = uniqWith(arr, areItemsEqual);
```

## 使用法

### `uniqWith(arr, areItemsEqual)`

2つの要素が同じかを判断するカスタム比較関数を基準に重複を除きたい場合は `uniqWith` を使用してください。比較関数が `true` を返す要素のうち最初に現れるものだけを残します。

```typescript
import { uniqWith } from 'es-toolkit/array';

// 数値の差が1未満の場合、同じものとして扱って重複を除きます。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqWith(numbers, (a, b) => Math.abs(a - b) < 1);
console.log(result); // [1.2, 3.2, 5.7, 7.19]

// オブジェクトを特定のフィールドを基準に比較して重複を除きます。
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 25 },
];
const uniqueByAge = uniqWith(users, (a, b) => a.age === b.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'John', age: 30 }, { id: 3, name: 'Bob', age: 25 }]

// 文字列を大文字小文字を区別せずに比較して重複を除きます。
const words = ['Apple', 'APPLE', 'banana', 'Banana', 'cherry'];
const uniqueCaseInsensitive = uniqWith(words, (a, b) => a.toLowerCase() === b.toLowerCase());
console.log(uniqueCaseInsensitive); // ['Apple', 'banana', 'cherry']
```

複雑なオブジェクトの比較も可能です。

```typescript
import { uniqWith } from 'es-toolkit/array';

const products = [
  { name: 'iPhone', brand: 'Apple', price: 1000 },
  { name: 'Galaxy', brand: 'Samsung', price: 900 },
  { name: 'iPhone', brand: 'Apple', price: 1100 }, // 同じnameとbrand
  { name: 'Pixel', brand: 'Google', price: 800 },
];

// 名前とブランドがどちらも同じ場合、重複と判断します。
const uniqueProducts = uniqWith(products, (a, b) => a.name === b.name && a.brand === b.brand);
console.log(uniqueProducts);
// [
//   { name: 'iPhone', brand: 'Apple', price: 1000 },
//   { name: 'Galaxy', brand: 'Samsung', price: 900 },
//   { name: 'Pixel', brand: 'Google', price: 800 }
// ]
```

#### パラメータ

- `arr` (`readonly T[]`): 重複を除く配列です。
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 2つの要素が同じかを判断する比較関数です。2つの要素が同じであれば `true` を、異なれば `false` を返す必要があります。

#### 戻り値

(`T[]`): 比較関数を基準に重複が除かれた新しい配列です。元の配列で最初に現れる順序を保持します。
