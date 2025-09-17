# isArrayLike (Lodash 호환성)

::: warning `Array.isArray`나 타입 확인을 사용하세요

이 `isArrayLike` 함수는 복잡한 길이 검증과 타입 체크로 인해 느리게 동작해요.

대신 더 빠르고 명확한 `Array.isArray(value)` 또는 `typeof value === 'string'` 같은 구체적인 타입 검사를 사용하세요.

:::

값이 배열 같은 객체인지 확인해요.

```typescript
const result = isArrayLike(value);
```

## 레퍼런스

### `isArrayLike(value)`

주어진 값이 배열 같은 객체인지 확인할 때 `isArrayLike`를 사용하세요. 배열, 문자열, arguments 객체, NodeList 등이 배열 같은 객체에 해당해요.

```typescript
import { isArrayLike } from 'es-toolkit/compat';

// 배열과 문자열
isArrayLike([1, 2, 3]); // true
isArrayLike('abc'); // true
isArrayLike(''); // true

// 배열 같은 객체
isArrayLike({ 0: 'a', 1: 'b', length: 2 }); // true
isArrayLike({ length: 0 }); // true

// arguments 객체
function example() {
  return isArrayLike(arguments); // true
}

// 배열이 아닌 것들
isArrayLike({}); // false
isArrayLike({ length: 'invalid' }); // false
isArrayLike(null); // false
isArrayLike(undefined); // false
isArrayLike(() => {}); // false
isArrayLike(123); // false
```

더 구체적인 확인을 위해서는 다음과 같은 현대적인 방법들을 사용하세요:

```typescript
// 더 명확한 방법들
Array.isArray(value); // 실제 배열인지 확인
typeof value === 'string'; // 문자열인지 확인
value instanceof HTMLCollection; // HTMLCollection인지 확인
value instanceof NodeList; // NodeList인지 확인
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

### 반환 값

(`boolean`): 값이 배열 같은 객체이면 `true`, 아니면 `false`를 반환해요.