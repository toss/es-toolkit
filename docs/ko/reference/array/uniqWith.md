# uniqWith

비교 함수를 사용해서 배열에서 중복된 요소들을 제거한 새로운 배열을 반환해요.

```typescript
const uniqueArray = uniqWith(arr, areItemsEqual);
```

## 레퍼런스

### `uniqWith(arr, areItemsEqual)`

두 요소가 같은지를 판단하는 사용자 정의 비교 함수를 기준으로 중복을 제거하고 싶을 때 `uniqWith`를 사용하세요. 비교 함수가 `true`를 반환하는 요소들 중 처음 나타나는 것만 남겨요.

```typescript
import { uniqWith } from 'es-toolkit/array';

// 숫자들의 차이가 1 미만인 경우 같은 것으로 취급해서 중복 제거해요.
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqWith(numbers, (a, b) => Math.abs(a - b) < 1);
console.log(result); // [1.2, 3.2, 5.7, 7.19]

// 객체들을 특정 필드를 기준으로 비교해서 중복 제거해요.
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 25 }
];
const uniqueByAge = uniqWith(users, (a, b) => a.age === b.age);
console.log(uniqueByAge); 
// [{ id: 1, name: 'John', age: 30 }, { id: 3, name: 'Bob', age: 25 }]

// 문자열을 대소문자 구분 없이 비교해서 중복 제거해요.
const words = ['Apple', 'APPLE', 'banana', 'Banana', 'cherry'];
const uniqueCaseInsensitive = uniqWith(words, (a, b) => a.toLowerCase() === b.toLowerCase());
console.log(uniqueCaseInsensitive); // ['Apple', 'banana', 'cherry']
```

복잡한 객체 비교도 가능해요.

```typescript
import { uniqWith } from 'es-toolkit/array';

const products = [
  { name: 'iPhone', brand: 'Apple', price: 1000 },
  { name: 'Galaxy', brand: 'Samsung', price: 900 },
  { name: 'iPhone', brand: 'Apple', price: 1100 }, // 같은 name과 brand
  { name: 'Pixel', brand: 'Google', price: 800 }
];

// 이름과 브랜드가 모두 같은 경우 중복으로 판단해요.
const uniqueProducts = uniqWith(products, (a, b) => 
  a.name === b.name && a.brand === b.brand
);
console.log(uniqueProducts);
// [
//   { name: 'iPhone', brand: 'Apple', price: 1000 },
//   { name: 'Galaxy', brand: 'Samsung', price: 900 },
//   { name: 'Pixel', brand: 'Google', price: 800 }
// ]
```

#### 파라미터

- `arr` (`readonly T[]`): 중복을 제거할 배열이에요.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 두 요소가 같은지 판단하는 비교 함수예요. 두 요소가 같다면 `true`를, 다르다면 `false`를 반환해야 해요.

#### 반환 값

(`T[]`): 비교 함수를 기준으로 중복이 제거된 새로운 배열이에요. 원본 배열에서 처음 나타나는 순서를 유지해요.
