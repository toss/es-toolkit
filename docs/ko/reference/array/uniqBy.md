# uniqBy

변환 함수가 반환하는 값을 기준으로 배열에서 중복된 요소들을 제거한 새로운 배열을 반환해요.

```typescript
const uniqueArray = uniqBy(arr, mapper);
```

## 사용법

### `uniqBy(arr, mapper)`

배열의 요소들을 특정 기준으로 변환해서 중복을 판단하고 싶을 때 `uniqBy`를 사용하세요. 변환 함수가 같은 값을 반환하는 요소들 중 처음 나타나는 것만 남겨요.

```typescript
import { uniqBy } from 'es-toolkit/array';

// 소수점 숫자들을 내림차순으로 변환해서 중복 제거해요.
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// 객체 배열에서 특정 속성을 기준으로 중복 제거해요.
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 문자열 길이를 기준으로 중복 제거해요.
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

복잡한 객체에서도 특정 필드의 조합을 기준으로 할 수 있어요.

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// 카테고리를 기준으로 중복 제거해요.
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### 파라미터

- `arr` (`readonly T[]`): 중복을 제거할 배열이에요.
- `mapper` (`(item: T) => U`): 각 요소를 비교할 값으로 변환하는 함수예요.

#### 반환 값

(`T[]`): 변환 함수의 결과를 기준으로 중복이 제거된 새로운 배열이에요. 원본 배열에서 처음 나타나는 순서를 유지해요.
