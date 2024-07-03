# without

배열에서 주어진 값을 제거한 새로운 배열을 만들어요. 

값이 같은지는 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 기준으로 비교하기 때문에, `NaN`과도 사용할 수 있어요.

## 인터페이스

```typescript
function without<T>(array: ArrayLike<T>, ...values: T[]): T[];
```

### 파라미터

- `array` (`ArrayLike<T>`): 필터링할 배열.
- `values` (`...T[]`): 제외할 값들.

### 반환 값

(`T[]`) 지정된 값을 제외한 새 배열.

### 에러

명시적으로 예외를 발생시키지는 않지만, 입력이 유효한 배열이 아니거나 배열 길이가 유효하지 않은 경우 빈 배열을 반환합니다.

## Examples

```typescript
import { without } from 'es-toolkit/array';

// 배열에서 지정된 값을 제거합니다
without([1, 2, 3, 4, 5], 2, 4);
// 반환: [1, 3, 5]

// 배열에서 지정된 문자열 값을 제거합니다
without(['a', 'b', 'c', 'a'], 'a');
// 반환: ['b', 'c']

// 지정된 값이 배열에 없는 경우를 처리합니다
without([1, 2, 3], 4, 5);
// 반환: [1, 2, 3]

// 다른 유형의 값을 포함한 경우를 처리합니다
without([1, '2', 3, '4'], 2, '4');
// 반환: [1, '2', 3]
```
