# isLength (Lodash 호환성)

::: warning es-toolkit의 [isLength](../../predicate/isLength.md)를 사용하세요
이 `isLength` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isLength](../../predicate/isLength.md)를 사용하세요.
:::

값이 유효한 길이인지 확인해요.

```typescript
const result = isLength(value);
```

## 레퍼런스

### `isLength(value)`

값이 유효한 길이인지 확인하고 싶을 때 `isLength`를 사용하세요. 유효한 길이는 숫자 타입이고, 음이 아닌 정수이며, JavaScript의 최대 안전 정수(`Number.MAX_SAFE_INTEGER`) 이하여야 해요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isLength } from 'es-toolkit/compat';

// 유효한 길이들
isLength(0); // true
isLength(42); // true
isLength(100); // true
isLength(Number.MAX_SAFE_INTEGER); // true

// 유효하지 않은 길이들
isLength(-1); // false (음수)
isLength(1.5); // false (정수가 아님)
isLength(Number.MAX_SAFE_INTEGER + 1); // false (안전 범위 초과)
isLength('3'); // false (문자열)
isLength(null); // false
isLength(undefined); // false
isLength({}); // false
isLength([]); // false
```

배열이나 문자열의 length 속성이 유효한지 확인할 때 유용해요.

```typescript
import { isLength } from 'es-toolkit/compat';

function validateArrayLength(arr: any[]) {
  if (isLength(arr.length)) {
    console.log(`배열의 길이 ${arr.length}는 유효해요`);
    return true;
  }
  return false;
}

validateArrayLength([1, 2, 3]); // "배열의 길이 3는 유효해요"
```

#### 파라미터

- `value` (`any`): 유효한 길이인지 확인할 값이에요.

### 반환 값

(`boolean`): 값이 유효한 길이이면 `true`, 아니면 `false`를 반환해요.
