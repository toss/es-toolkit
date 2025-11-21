# takeRightWhile

조건 함수가 참을 반환하는 동안 배열의 끝에서부터 요소들을 가져와서 새 배열을 반환해요.

```typescript
const result = takeRightWhile(arr, shouldContinueTaking);
```

## 사용법

### `takeRightWhile(arr, shouldContinueTaking)`

배열의 끝에서부터 조건을 만족하는 요소들을 가져오고 싶을 때 `takeRightWhile`을 사용하세요. 조건 함수가 거짓을 반환하는 첫 번째 요소를 만나면 멈춰요.

```typescript
import { takeRightWhile } from 'es-toolkit/array';

// 4보다 작은 숫자들을 끝에서부터 가져와요
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
// 결과: [3, 2, 1]

// 3보다 큰 숫자들을 끝에서부터 가져와요
takeRightWhile([1, 2, 3], n => n > 3);
// 결과: []

// 문자열 길이가 5 이하인 요소들을 가져와요
takeRightWhile(['hello', 'world', 'foo', 'bar'], str => str.length <= 5);
// 결과: ['hello', 'world', 'foo', 'bar']
```

#### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `shouldContinueTaking` (`(item: T) => boolean`): 각 요소와 함께 호출되는 조건 함수예요. 이 함수가 참을 반환하는 동안 요소들이 결과에 포함돼요.

#### 반환 값

(`T[]`): 조건 함수가 참을 반환하는 동안 배열의 끝에서부터 가져온 요소들을 포함하는 새 배열이에요.
