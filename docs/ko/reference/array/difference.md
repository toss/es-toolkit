# difference

두 배열의 차이를 계산해요.

이 함수는 파라미터로 두 배열을 받아서, 첫 번째 배열에 있지만 두 번째 배열에는 없는 요소들을 포함한 새로운 배열을 반환해요.
즉, 첫 번째 배열에서 두 번째 배열에 있는 요소들을 제외한 나머지 요소들로 구성된 배열을 만들어줘요.

## 인터페이스

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

### 파라미터

- `firstArr` (`T[]`): 차이를 계산할 배열이에요. 이 배열이 주 배열이고, 이 배열의 요소들이 비교되고 필터링돼요.
- `secondArr` (`T[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요. 이 배열의 각 요소는 첫 번째 배열과 비교되며, 일치하는 요소가 있으면 결과에서 제외돼요.

### 반환 값

(`T[]`): 첫 번째 배열에는 있지만 두 번째 배열에는 없는 요소들이 담긴 새로운 배열이에요.

## 예시

```typescript
import { difference } from 'es-toolkit/array';

// 사용 예제:
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// 2와 4는 두 배열 모두에 있기 때문에 결과에서 제외되고, result 변수에는 [1, 3, 5]가 할당되어요.
```

## Lodash 호환성

`es-toolkit/compat`에서 `difference`를 가져오면 lodash와 호환돼요.

- `difference`는 첫 번째 배열과 비교하기 위해 여러 배열을 받을 수 있어요.
- `difference`는 유사 배열 객체를 인수로 받을 수 있어요.

```typescript
import { difference } from 'es-toolkit/compat';

const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const array3 = [5, 6];
const result = difference(array1, array2, array3);
// 2, 4, 5는 적어도 하나의 배열에 있기 때문에 결과에서 제외되고, result 변수에는 [1, 3]가 할당되어요.

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };
const result2 = difference(arrayLike1, arrayLike2);
// 2는 두 유사 배열 객체에 있기 때문에 결과에서 제외되고, result2 변수에는 [1, 3]가 할당되어요.
```

## 성능 비교

|            | [번들 사이즈](../../bundle-size.md) | [성능](../../performance.md) |
| ---------- | ----------------------------------- | ---------------------------- |
| es-toolkit | 90 바이트 (92.4% 작음)              | 9,317,227 회 (85% 빠름)      |
| lodash-es  | 7,958 바이트                        | 5,030,861 회                 |
