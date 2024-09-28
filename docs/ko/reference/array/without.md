# without

배열에서 주어진 값을 제거한 새로운 배열을 만들어요.

값이 같은지는 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 기준으로 비교하기 때문에, `NaN`과도 사용할 수 있어요.

## 인터페이스

```typescript
function without<T>(array: T[], ...values: T[]): T[];
```

### 파라미터

- `array` (`T[]`): 값을 제거할 배열.
- `values` (`...T[]`): 제거할 값.

### 반환 값

(`T[]`) 주어진 값을 제외한 새 배열.

## 예시

```typescript
import { without } from 'es-toolkit/array';

// 배열에서 지정된 값을 제거합니다
without([1, 2, 3, 4, 5], 2, 4);
// 결과 값: [1, 3, 5]

// 배열에서 지정된 문자열 값을 제거합니다
without(['a', 'b', 'c', 'a'], 'a');
// 결과 값: ['b', 'c']

// 지정된 값이 배열에 없는 경우를 처리합니다
without([1, 2, 3], 4, 5);
// 결과 값: [1, 2, 3]

// 다른 유형의 값을 포함한 경우를 처리합니다
without([1, '2', 3, '4'], 2, '4');
// 결과 값: [1, '2', 3]
```
