# isObject (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요

이 `isObject` 함수는 null 체크와 복잡한 객체 판별로 인해 느리게 동작해요.

대신 더 간단하고 현대적인 `typeof value === 'object' && value !== null`을 사용하세요.

:::

값이 객체인지 확인해요.

```typescript
const result = isObject(value);
```

## 레퍼런스

### `isObject(value)`

값이 객체인지 확인하고 싶을 때 `isObject`를 사용하세요. JavaScript에서는 배열, 함수, 객체, 정규식, Date 등이 모두 객체로 취급돼요.

```typescript
import { isObject } from 'es-toolkit/compat';

// 일반 객체
isObject({});
// Returns: true

// 배열도 객체
isObject([1, 2, 3]);
// Returns: true

// 함수도 객체
isObject(() => {});
// Returns: true

// Date도 객체
isObject(new Date());
// Returns: true

// null은 객체가 아님
isObject(null);
// Returns: false

// 원시 타입은 객체가 아님
isObject('string');
// Returns: false

isObject(123);
// Returns: false
```

#### 파라미터

- `value` (`unknown`): 객체인지 확인할 값이에요.

### 반환 값

(`value is object`): 값이 객체면 `true`, 아니면 `false`를 반환해요.
