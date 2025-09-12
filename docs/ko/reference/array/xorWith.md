# xorWith

사용자 정의 동등성 함수를 사용하여 두 배열의 대칭 차집합을 계산해요.

이 함수는 두 배열과 동등성 함수를 받아서, 동등성 함수를 기준으로 두 배열 중 하나에만 있는 요소들로 구성된 배열을 반환해요. 사용자가 정의한 함수를 통해 요소들의 동등성을 판단하므로, 복잡한 객체나 특별한 비교 조건이 필요한 경우에 유용해요.

## 인터페이스

```typescript
function xorWith<T>(
  arr1: readonly T[], 
  arr2: readonly T[], 
  areElementsEqual: (item1: T, item2: T) => boolean
): T[];
```

### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 두 요소가 동일한지 판단하는 사용자 정의 함수예요. 두 요소가 같으면 `true`, 다르면 `false`를 반환해야 해요.

### 반환 값

(`T[]`): 사용자 정의 동등성 함수를 기준으로 계산된 대칭 차집합을 나타내는 새 배열이에요.

## 예시

```typescript
import { xorWith } from 'es-toolkit/array';

// 객체의 id 속성을 기준으로 비교
const users1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const users2 = [{ id: 2, name: 'Bobby' }, { id: 3, name: 'Charlie' }];
const result = xorWith(users1, users2, (a, b) => a.id === b.id);
console.log(result);
// 출력: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// 대소문자를 무시한 문자열 비교
const words1 = ['Apple', 'Banana'];
const words2 = ['APPLE', 'Cherry'];
const result2 = xorWith(words1, words2, (a, b) => a.toLowerCase() === b.toLowerCase());
console.log(result2);
// 출력: ['Banana', 'Cherry']

// 수학적 비교 (절댓값 기준)
const numbers1 = [-1, -2, 3];
const numbers2 = [1, 2, -4];
const result3 = xorWith(numbers1, numbers2, (a, b) => Math.abs(a) === Math.abs(b));
console.log(result3);
// 출력: [3, -4]

// 깊은 객체 비교
const products1 = [
  { name: 'Laptop', specs: { ram: 8, storage: 256 } },
  { name: 'Phone', specs: { ram: 6, storage: 128 } }
];
const products2 = [
  { name: 'Tablet', specs: { ram: 8, storage: 256 } },
  { name: 'Watch', specs: { ram: 1, storage: 32 } }
];
const result4 = xorWith(products1, products2, (a, b) => 
  a.specs.ram === b.specs.ram && a.specs.storage === b.specs.storage
);
console.log(result4);
// 출력: [
//   { name: 'Phone', specs: { ram: 6, storage: 128 } }, 
//   { name: 'Watch', specs: { ram: 1, storage: 32 } }
// ]
```

## Lodash 호환성

`es-toolkit/compat`에서 `xorWith`를 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { xorWith } from 'es-toolkit/compat';

const result = xorWith(
  [{ id: 1 }, { id: 2 }], 
  [{ id: 2 }, { id: 3 }], 
  (a, b) => a.id === b.id
);
// 결과: [{ id: 1 }, { id: 3 }]
```
