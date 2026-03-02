# rangeRight

지정된 범위와 간격으로 역순으로 숫자 배열을 생성해요.

```typescript
const numbers = rangeRight(end);
const numbers = rangeRight(start, end, step?);
```

## 사용법

### `rangeRight(end)`

끝 값부터 0까지 역순으로 연속된 숫자 배열이 필요할 때 `rangeRight`를 사용하세요. `range`와 같지만 결과가 뒤에서부터 나와요.

```typescript
import { rangeRight } from 'es-toolkit/math';

// 3부터 0까지 역순으로 배열을 만들어요.
const numbers1 = rangeRight(4);
console.log(numbers1); // [3, 2, 1, 0]

// 배열의 역순 인덱스
const items = ['a', 'b', 'c', 'd', 'e'];
const reverseIndices = rangeRight(items.length);
reverseIndices.forEach(i => {
  console.log(items[i]); // 'e', 'd', 'c', 'b', 'a' 순으로 출력
});
```

#### 파라미터

- `end` (`number`): 끝 값(미포함)이에요. 0부터 시작해요.

#### 반환 값

(`number[]`): 끝 값부터 0까지 생성된 역순 숫자 배열을 반환해요.

### `rangeRight(start, end, step?)`

지정된 시작값, 끝값, 간격으로 역순 연속된 숫자 배열이 필요할 때 `rangeRight`를 사용하세요. `range`와 같지만 결과가 뒤에서부터 나와요.

```typescript
import { rangeRight } from 'es-toolkit/math';

// 4부터 1까지 역순으로 배열을 만들어요.
const numbers2 = rangeRight(1, 5);
console.log(numbers2); // [4, 3, 2, 1]

// 15부터 0까지 5씩 감소하는 배열을 만들어요.
const numbers3 = rangeRight(0, 20, 5);
console.log(numbers3); // [15, 10, 5, 0]

// 음수 방향으로도 만들 수 있어요.
const numbers4 = rangeRight(-5, 0, 1);
console.log(numbers4); // [-1, -2, -3, -4, -5]

// 큰 숫자에서 작은 숫자로 갈 때도 가능해요.
const numbers5 = rangeRight(5, 0, -1);
console.log(numbers5); // [1, 2, 3, 4, 5]
```

카운트다운이나 페이지네이션에서 역순이 필요할 때 유용해요.

```typescript
import { rangeRight } from 'es-toolkit/math';

// 카운트다운 만들기
const countdown = rangeRight(0, 11);
console.log(countdown); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// 페이지네이션에서 마지막 페이지부터 첫 페이지로
const pageNumbers = rangeRight(1, 11);
console.log(pageNumbers); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### 파라미터

- `start` (`number`): 시작 값이에요. 결과 배열에 포함돼요.
- `end` (`number`): 끝 값이에요. 결과 배열에 포함되지 않아요.
- `step` (`number`, 선택): 각 숫자 사이의 간격이에요. 0이 아닌 정수여야 하고, 기본값은 `1`이에요.

#### 반환 값

(`number[]`): 지정된 범위와 간격으로 생성된 역순 숫자 배열을 반환해요.

#### 에러

- `step`이 0이거나 정수가 아니면 에러를 던져요.
