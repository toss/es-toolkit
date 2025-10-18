# toFinite (Lodash 호환성)

값을 유한한 숫자로 변환해요.

```typescript
const finite = toFinite(value);
```

## 레퍼런스

### `toFinite(value)`

값을 유한한 숫자로 변환해요. 무한대는 Number.MAX_VALUE로, NaN은 0으로 처리해요.

```typescript
import { toFinite } from 'es-toolkit/compat';

// 일반 숫자는 그대로 반환
toFinite(3.2);
// Returns: 3.2

// 무한대는 MAX_VALUE로 변환
toFinite(Infinity);
// Returns: 1.7976931348623157e+308

toFinite(-Infinity);
// Returns: -1.7976931348623157e+308

// 문자열 숫자는 숫자로 변환
toFinite('3.2');
// Returns: 3.2
```

잘못된 값들은 0으로 변환해요.

```typescript
import { toFinite } from 'es-toolkit/compat';

toFinite(NaN);
// Returns: 0

toFinite(Symbol.iterator);
// Returns: 0

toFinite(null);
// Returns: 0
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

#### 반환 값

(`number`): 변환된 유한한 숫자를 반환해요.
