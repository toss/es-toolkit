# toInteger (Lodash 호환성)

값을 정수로 변환해요.

```typescript
const integer = toInteger(value);
```

## 레퍼런스

### `toInteger(value)`

값을 정수로 변환해요. 소수 부분은 버려서 정수만 남겨요.

```typescript
import { toInteger } from 'es-toolkit/compat';

// 소수를 정수로 변환
toInteger(3.2);
// Returns: 3

// 문자열 숫자를 정수로 변환
toInteger('3.2');
// Returns: 3

// 매우 작은 수는 0이 됨
toInteger(Number.MIN_VALUE);
// Returns: 0

// 무한대는 MAX_VALUE가 됨
toInteger(Infinity);
// Returns: 1.7976931348623157e+308
```

잘못된 값들은 0으로 변환해요.

```typescript
import { toInteger } from 'es-toolkit/compat';

toInteger(NaN);
// Returns: 0

toInteger(Symbol.iterator);
// Returns: 0

toInteger(null);
// Returns: 0
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

### 반환 값

(`number`): 변환된 정수를 반환해요.
