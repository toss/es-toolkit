# without

배열에서 지정된 값들을 제거한 새 배열을 생성해요.

이 함수는 첫 번째 인수로 배열을 받고, 나머지 인수들로 제거할 값들을 받아요. 원본 배열에서 지정된 값들과 일치하는 모든 요소를 제거한 새 배열을 반환해요. 요소들의 비교는 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 알고리즘을 사용해서 수행돼요.

## 인터페이스

```typescript
function without<T>(array: readonly T[], ...values: T[]): T[];
```

### 파라미터

- `array` (`readonly T[]`): 값들을 제거할 원본 배열이에요.
- `values` (`...T[]`): 배열에서 제거할 값들이에요.

### 반환 값

(`T[]`): 지정된 값들이 제거된 새 배열이에요.

## 예시

```typescript
import { without } from 'es-toolkit/array';

// 기본 사용법
const numbers = [1, 2, 3, 4, 5, 2, 4];
const result = without(numbers, 2, 4);
console.log(result);
// 출력: [1, 3, 5]

// 문자열 배열에서 사용
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const result2 = without(fruits, 'banana');
console.log(result2);
// 출력: ['apple', 'cherry']

// 제거할 값이 배열에 없는 경우
const colors = ['red', 'green', 'blue'];
const result3 = without(colors, 'yellow', 'purple');
console.log(result3);
// 출력: ['red', 'green', 'blue']

// 타입이 다른 값들 처리
const mixed = [1, '2', 3, '4'];
const result4 = without(mixed, 2, '4');
console.log(result4);
// 출력: [1, '2', 3] ('4'만 제거됨, 숫자 2와 문자열 '2'는 다른 값으로 처리)

// NaN과 함께 사용
const withNaN = [1, NaN, 3, NaN, 5];
const result5 = without(withNaN, NaN);
console.log(result5);
// 출력: [1, 3, 5]
```

## Lodash 호환성

`es-toolkit/compat`에서 `without`을 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { without } from 'es-toolkit/compat';

const array = [1, 2, 3, 2];
const result = without(array, 2);
// 결과: [1, 3]
```
