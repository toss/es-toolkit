# isArrayLikeObject (Lodash 호환성)

::: warning `Array.isArray`나 구체적인 타입 확인을 사용하세요

이 `isArrayLikeObject` 함수는 이중 검증과 복잡한 타입 체크로 인해 느리게 동작해요.

대신 더 빠르고 명확한 `Array.isArray(value)` 또는 구체적인 객체 타입 검사를 사용하세요.

:::

값이 원시값이 아닌 배열 같은 객체인지 확인해요.

```typescript
const result = isArrayLikeObject(value);
```

## 레퍼런스

### `isArrayLikeObject(value)`

주어진 값이 원시값이 아닌 배열 같은 객체인지 확인할 때 `isArrayLikeObject`를 사용하세요. 배열, arguments 객체, NodeList 등이 해당하지만 문자열은 원시값이므로 제외돼요.

```typescript
import { isArrayLikeObject } from 'es-toolkit/compat';

// 배열 같은 객체들 (원시값 아님)
isArrayLikeObject([1, 2, 3]); // true
isArrayLikeObject({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLikeObject({ length: 0 }); // true

// arguments 객체
function example() {
  return isArrayLikeObject(arguments); // true
}

// NodeList나 HTMLCollection (브라우저에서)
isArrayLikeObject(document.querySelectorAll('div')); // true

// 원시값들은 false (문자열 포함)
isArrayLikeObject('abc'); // false
isArrayLikeObject(''); // false
isArrayLikeObject(123); // false
isArrayLikeObject(true); // false

// 다른 객체들
isArrayLikeObject({}); // false
isArrayLikeObject(null); // false
isArrayLikeObject(undefined); // false
isArrayLikeObject(() => {}); // false
```

더 구체적인 확인을 위해서는 다음과 같은 현대적인 방법들을 사용하세요:

```typescript
// 더 명확한 방법들
Array.isArray(value); // 실제 배열인지 확인
value instanceof HTMLCollection; // HTMLCollection인지 확인
value instanceof NodeList; // NodeList인지 확인
value && typeof value === 'object' && typeof value.length === 'number'; // 배열 같은 객체인지 확인
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

### 반환 값

(`boolean`): 값이 원시값이 아닌 배열 같은 객체이면 `true`, 아니면 `false`를 반환해요.