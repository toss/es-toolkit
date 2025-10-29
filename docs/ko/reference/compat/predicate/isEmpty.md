# isEmpty (Lodash 호환성)

주어진 값이 비어 있는지 확인해요.

```typescript
const result = isEmpty(value);
```

## 레퍼런스

### `isEmpty(value)`

다양한 타입의 값이 비어 있는지 확인할 때 `isEmpty`를 사용하세요. 문자열, 배열, 객체, Map, Set 등을 모두 처리할 수 있어요.

```typescript
import { isEmpty } from 'es-toolkit/compat';

// 문자열 확인
isEmpty(''); // true
isEmpty('hello'); // false

// 배열 확인
isEmpty([]); // true
isEmpty([1, 2, 3]); // false

// 객체 확인
isEmpty({}); // true
isEmpty({ a: 1 }); // false

// Map과 Set 확인
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false

// null과 undefined
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(); // true

// 배열 같은 객체
isEmpty({ 0: 'a', length: 1 }); // false
isEmpty({ length: 0 }); // false
```

원시 값들은 모두 빈 값으로 처리돼요:

```typescript
import { isEmpty } from 'es-toolkit/compat';

isEmpty(0); // true
isEmpty(false); // true
isEmpty(123); // true
isEmpty('text'); // false (문자열은 길이로 판단)
```

#### 파라미터

- `value` (`unknown`, 선택): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 비어 있으면 `true`, 아니면 `false`를 반환해요.
