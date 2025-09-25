# toString (Lodash 호환성)

::: warning String 생성자를 사용하세요

이 `toString` 함수는 복잡한 배열 처리와 -0 특수 케이스 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 String(value)를 사용하세요.

:::

값을 문자열로 변환해요.

```typescript
const str = toString(value);
```

## 레퍼런스

### `toString(value)`

값을 문자열로 변환해요. null과 undefined는 빈 문자열로, -0의 부호는 보존해요.

```typescript
import { toString } from 'es-toolkit/compat';

// 기본 타입들
toString(null);
// Returns: ''

toString(undefined);
// Returns: ''

toString('hello');
// Returns: 'hello'

toString(123);
// Returns: '123'

// -0의 부호 보존
toString(-0);
// Returns: '-0'
```

배열은 재귀적으로 변환해요.

```typescript
import { toString } from 'es-toolkit/compat';

// 배열을 문자열로 변환
toString([1, 2, 3]);
// Returns: '1,2,3'

// 중첩 배열
toString([1, [2, 3], 4]);
// Returns: '1,2,3,4'

// -0을 포함한 배열
toString([1, 2, -0]);
// Returns: '1,2,-0'

// 심볼을 포함한 배열
toString([Symbol('a'), Symbol('b')]);
// Returns: 'Symbol(a),Symbol(b)'
```

#### 파라미터

- `value` (`any`): 변환할 값이에요.

#### 반환 값

(`string`): 변환된 문자열을 반환해요. null과 undefined는 빈 문자열을 반환해요.
