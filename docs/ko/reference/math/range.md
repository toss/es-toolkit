# range

지정된 범위와 간격으로 숫자 배열을 생성해요.

```typescript
const numbers = range(end);
const numbers = range(start, end, step);
```

## 레퍼런스

### `range(end)`

0부터 지정된 끝 값까지의 연속된 숫자 배열이 필요할 때 `range`를 사용하세요. 반복문을 쓸 때 유용해요.

```typescript
import { range } from 'es-toolkit/math';

// 0부터 3까지의 배열을 만들어요.
const numbers1 = range(4);
console.log(numbers1); // [0, 1, 2, 3]

// 10개의 요소를 가진 배열의 인덱스
const indices = range(10);
console.log(indices); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// forEach 대신 사용할 수 있어요.
range(5).forEach(i => {
  console.log(`반복 ${i}`); // 반복 0, 반복 1, 반복 2, 반복 3, 반복 4
});
```

#### 파라미터

- `end` (`number`): 끝 값(미포함)이에요. 0부터 시작해요.

#### 반환 값

(`number[]`): 0부터 끝 값까지 생성된 숫자 배열을 반환해요.

### `range(start, end, step?)`

지정된 시작값, 끝값, 간격으로 연속된 숫자 배열이 필요할 때 `range`를 사용하세요. 반복문을 쓸 때 유용해요.

```typescript
import { range } from 'es-toolkit/math';

// 1부터 4까지의 배열을 만들어요.
const numbers2 = range(1, 5);
console.log(numbers2); // [1, 2, 3, 4]

// 0부터 20까지 5씩 증가하는 배열을 만들어요.
const numbers3 = range(0, 20, 5);
console.log(numbers3); // [0, 5, 10, 15]

// 음수 방향으로도 만들 수 있어요.
const numbers4 = range(0, -5, -1);
console.log(numbers4); // [0, -1, -2, -3, -4]

// 큰 숫자에서 작은 숫자로 갈 때도 가능해요.
const numbers5 = range(5, 0, -1);
console.log(numbers5); // [5, 4, 3, 2, 1]

// 특정 범위의 페이지 번호 만들기
const pageNumbers = range(1, 11);
console.log(pageNumbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### 파라미터

- `start` (`number`): 시작 값이에요. 결과 배열에 포함돼요.
- `end` (`number`): 끝 값이에요. 결과 배열에 포함되지 않아요.
- `step` (`number`, 선택): 각 숫자 사이의 간격이에요. 0이 아닌 정수여야 하고, 기본값은 `1`이에요.

#### 반환 값

(`number[]`): 지정된 범위와 간격으로 생성된 숫자 배열을 반환해요.

#### 에러

- `step`이 0이거나 정수가 아니면 에러를 던져요.
