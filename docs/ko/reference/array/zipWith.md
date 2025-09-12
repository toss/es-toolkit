# zipWith

사용자 정의 결합 함수를 사용하여 여러 배열을 하나의 배열로 결합해요.

이 함수는 여러 배열과 결합 함수를 받아서, 각 배열의 같은 인덱스에 있는 요소들을 결합 함수에 전달하여 새로운 값을 생성하고, 이 값들로 구성된 새 배열을 반환해요. 배열들의 길이가 다를 경우, 가장 긴 배열의 길이만큼 결과를 생성하고, 짧은 배열의 빈 자리는 `undefined`로 전달돼요.

## 인터페이스

```typescript
function zipWith<T, R>(arr1: readonly T[], combine: (item: T) => R): R[];
function zipWith<T, U, R>(arr1: readonly T[], arr2: readonly U[], combine: (item1: T, item2: U) => R): R[];
function zipWith<T, U, V, R>(arr1: readonly T[], arr2: readonly U[], arr3: readonly V[], combine: (item1: T, item2: U, item3: V) => R): R[];
function zipWith<T, U, V, W, R>(
  arr1: readonly T[], 
  arr2: readonly U[], 
  arr3: readonly V[], 
  arr4: readonly W[], 
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
function zipWith<T, R>(arr1: readonly T[], ...rest: any[]): R[];
```

### 파라미터

- `arr1` (`readonly T[]`): 첫 번째 배열이에요.
- `arr2` (`readonly U[]`, 선택): 두 번째 배열이에요.
- `arr3` (`readonly V[]`, 선택): 세 번째 배열이에요.
- `arr4` (`readonly W[]`, 선택): 네 번째 배열이에요.
- `combine` (`(...items: any[]) => R`): 각 배열의 해당 인덱스 요소들을 받아서 새로운 값을 반환하는 결합 함수예요.

### 반환 값

(`R[]`): 결합 함수를 적용한 결과로 구성된 새 배열이에요.

## 예시

```typescript
import { zipWith } from 'es-toolkit/array';

// 두 배열의 요소들을 더하기
const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];
const sums = zipWith(numbers1, numbers2, (a, b) => a + b);
console.log(sums);
// 출력: [5, 7, 9]

// 문자열 결합
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35];
const descriptions = zipWith(names, ages, (name, age) => `${name} is ${age} years old`);
console.log(descriptions);
// 출력: ['Alice is 25 years old', 'Bob is 30 years old', 'Charlie is 35 years old']

// 세 배열 결합
const x = [1, 2];
const y = [3, 4];
const z = [5, 6];
const coordinates = zipWith(x, y, z, (x, y, z) => `(${x}, ${y}, ${z})`);
console.log(coordinates);
// 출력: ['(1, 3, 5)', '(2, 4, 6)']

// 길이가 다른 배열들
const short = [1, 2];
const long = [10, 20, 30, 40];
const result = zipWith(short, long, (a, b) => (a ?? 0) + (b ?? 0));
console.log(result);
// 출력: [11, 22, 30, 40] (undefined는 0으로 처리)

// 조건부 결합
const prices = [100, 200, 300];
const discounts = [0.1, 0.2, 0.15];
const finalPrices = zipWith(prices, discounts, (price, discount) => 
  Math.round(price * (1 - discount))
);
console.log(finalPrices);
// 출력: [90, 160, 255]

// 복잡한 객체 생성
const ids = [1, 2, 3];
const userNames = ['john', 'jane', 'bob'];
const emails = ['john@ex.com', 'jane@ex.com', 'bob@ex.com'];
const users = zipWith(ids, userNames, emails, (id, name, email) => ({
  id,
  name,
  email,
  createdAt: new Date().toISOString()
}));
console.log(users);
// 출력: [
//   { id: 1, name: 'john', email: 'john@ex.com', createdAt: '...' },
//   { id: 2, name: 'jane', email: 'jane@ex.com', createdAt: '...' },
//   { id: 3, name: 'bob', email: 'bob@ex.com', createdAt: '...' }
// ]

// 하나의 배열만 사용
const numbers = [1, 2, 3];
const doubled = zipWith(numbers, x => x * 2);
console.log(doubled);
// 출력: [2, 4, 6]
```

## Lodash 호환성

`es-toolkit/compat`에서 `zipWith`를 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { zipWith } from 'es-toolkit/compat';

const result = zipWith([1, 2], [3, 4], [5, 6], (a, b, c) => a + b + c);
// 결과: [9, 12]
```
