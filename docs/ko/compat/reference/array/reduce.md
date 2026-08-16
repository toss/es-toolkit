# reduce (Lodash 호환성)

::: warning `Array.prototype.reduce`나 `Object.values`와 `reduce`를 사용하세요

이 `reduce` 함수는 복잡한 타입 처리와 다양한 입력 형태 지원으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.reduce` 메서드나 객체의 경우 `Object.values`와 함께 사용하세요.

:::

배열이나 객체를 하나의 값으로 줄여요.

```typescript
const result = reduce(collection, iteratee, initialValue);
```

## 사용법

### `reduce(collection, iteratee, initialValue)`

배열이나 객체의 모든 요소를 하나씩 순회하면서 누적값을 계산하세요. 초기 값을 제공하면 그 값부터 시작하고, 그렇지 않으면 첫 번째 요소부터 시작해요.

```typescript
import { reduce } from 'es-toolkit/compat';

// 배열의 합계 구하기
const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value, 0);
console.log(sum); // 10

// 객체 값들의 합계 구하기
const scores = { math: 95, english: 87, science: 92 };
const totalScore = reduce(scores, (acc, value) => acc + value, 0);
console.log(totalScore); // 274
```

초기 값을 제공하지 않으면 첫 번째 요소가 초기 값이 되고 두 번째 요소부터 순회해요.

```typescript
import { reduce } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (1 + 2 + 3 + 4)

// 빈 배열이면 undefined가 반환돼요
const empty = [];
const result = reduce(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### 파라미터

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 순회할 배열이나 객체예요.
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): 각 요소에 대해 호출할 함수예요. 누적값, 현재 값, 인덱스/키, 원본 배열/객체를 받아요.
- `initialValue` (`any`, 선택): 누적값의 초기 값이에요. 제공하지 않으면 첫 번째 요소가 초기 값이 돼요.

#### 반환 값

(`any`): 모든 요소를 처리한 후의 최종 누적값을 반환해요.
