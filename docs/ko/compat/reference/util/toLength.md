# toLength (Lodash 호환성)

값을 유효한 배열 인덱스로 변환해요.

```typescript
const length = toLength(value);
```

## 사용법

### `toLength(value)`

값을 유효한 배열 인덱스로 변환해요. 0 이상 2^32-1 이하의 정수로 제한해요.

```typescript
import { toLength } from 'es-toolkit/compat';

// 소수를 정수로 변환
toLength(3.2);
// Returns: 3

// 음수는 0으로 변환
toLength(-1);
// Returns: 0

// 문자열 숫자를 변환
toLength('42');
// Returns: 42

// 매우 큰 수는 제한값으로 변환
toLength(Number.MAX_VALUE);
// Returns: 4294967295
```

null이나 undefined는 0으로 변환해요.

```typescript
import { toLength } from 'es-toolkit/compat';

toLength(null);
// Returns: 0

toLength(undefined);
// Returns: 0
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

#### 반환 값

(`number`): 0 이상 2^32-1 이하의 유효한 배열 인덱스를 반환해요.
