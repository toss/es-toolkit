# isBoolean

주어진 값이 참 또는 거짓 타입인지 확인해요.

```typescript
const result = isBoolean(value);
```

## 레퍼런스

### `isBoolean(value)`

값이 정확히 `true` 또는 `false`인지 확인하고 싶을 때 `isBoolean`을 사용하세요. TypeScript에서 타입 가드로 동작해서 값의 타입을 `boolean`으로 좁혀줘요.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// 기본 참 또는 거짓 값 확인
isBoolean(true); // true
isBoolean(false); // true

// 다른 타입들과 구분
isBoolean(1); // false
isBoolean(0); // false
isBoolean('true'); // false
isBoolean('false'); // false
```

TypeScript에서 타입 가드로 사용할 때 특히 유용해요.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

function processValue(value: unknown) {
  if (isBoolean(value)) {
    // value는 boolean으로 타입이 좁혀져요
    console.log(value ? '참이에요' : '거짓이에요');
  } else {
    console.log('참 또는 거짓 값이 아니에요');
  }
}
```

API 응답이나 사용자 입력 검증에도 활용할 수 있어요.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// API 응답 검증
interface APIResponse {
  success: unknown;
  data: any;
}

function validateResponse(response: APIResponse) {
  if (isBoolean(response.success)) {
    console.log(`API 호출 ${response.success ? '성공' : '실패'}`);
    return response.success;
  }
  console.log('잘못된 응답 형식이에요');
  return false;
}
```

#### 파라미터

- `value` (`unknown`): 참 또는 거짓 타입인지 확인할 값이에요.

#### 반환 값

(`value is boolean`): 값이 `true` 또는 `false`이면 `true`, 그렇지 않으면 `false`를 반환해요.

