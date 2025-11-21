# isObjectLike (Lodash 호환성)

값이 객체 같은지 확인해요.

```typescript
const result = isObjectLike(value);
```

## 사용법

### `isObjectLike(value)`

주어진 값이 객체 같은 값인지 확인할 때 `isObjectLike`를 사용하세요. 객체 같은 값은 `typeof` 연산의 결과가 `'object'`이고 `null`이 아닌 값이에요.

```typescript
import { isObjectLike } from 'es-toolkit/compat';

// 객체 같은 값들
isObjectLike({ a: 1 }); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(new Date()); // true
isObjectLike(/regex/); // true
isObjectLike(new Map()); // true
isObjectLike(new Set()); // true

// 객체 같지 않은 값들
isObjectLike('abc'); // false
isObjectLike(123); // false
isObjectLike(true); // false
isObjectLike(() => {}); // false
isObjectLike(Symbol('sym')); // false

// 특별한 경우
isObjectLike(null); // false (null은 typeof가 'object'이지만 객체 같지 않음)
isObjectLike(undefined); // false
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 객체 같으면 `true`, 아니면 `false`를 반환해요.
