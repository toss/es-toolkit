# times (Lodash 호환성)

주어진 횟수만큼 함수를 실행하고 결과를 배열로 반환해요.

```typescript
const result = times(n, iteratee);
```

## 레퍼런스

### `times(n, iteratee)`

주어진 횟수만큼 반복 함수를 실행하고 결과를 배열로 반환해요. 각 반복에서 현재 인덱스를 함수에 전달해요.

```typescript
import { times } from 'es-toolkit/compat';

// 0부터 2까지의 인덱스에 2를 곱한 값들의 배열
times(3, i => i * 2);
// Returns: [0, 2, 4]

// 같은 값을 여러 번 생성
times(2, () => 'es-toolkit');
// Returns: ['es-toolkit', 'es-toolkit']
```

함수를 전달하지 않으면 인덱스 배열을 반환해요.

```typescript
import { times } from 'es-toolkit/compat';

times(3);
// Returns: [0, 1, 2]
```

#### 파라미터

- `n` (`number`): 반복할 횟수예요. 정수로 변환되며, 1보다 작거나 안전하지 않은 정수면 빈 배열을 반환해요.
- `iteratee` (`(num: number) => T`, 선택): 각 반복에서 실행할 함수예요. 인덱스를 인수로 받아요. 제공하지 않으면 인덱스를 그대로 반환해요.

#### 반환 값

(`T[]`): 각 반복에서 실행한 함수의 결과들로 이뤄진 배열을 반환해요.
