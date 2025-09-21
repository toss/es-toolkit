# isArrayLike (Lodash 호환성)

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

#### 파라미터

- `value` (`any`): 확인할 값이에요.

### 반환 값

(`boolean`): 값이 배열 같은 객체이면 `true`, 아니면 `false`를 반환해요.
