# isBoolean

주어진 값이 불린(boolean) 타입인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `boolean`으로 좁혀요.

## 인터페이스

```typescript
function isBoolean(value: unknown): value is boolean;
```

### 파라미터

- `value` (`unknown`): 불린 타입인지 확인할 값이에요.

### 반환 값

(`value is boolean`): 값이 `true`나 `false`이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// 기본 불린 값 확인
console.log(isBoolean(true)); // true
console.log(isBoolean(false)); // true

// 다른 타입들과 구분
console.log(isBoolean(1)); // false
console.log(isBoolean(0)); // false
console.log(isBoolean('true')); // false
console.log(isBoolean('false')); // false
console.log(isBoolean(null)); // false
console.log(isBoolean(undefined)); // false
console.log(isBoolean({})); // false
console.log(isBoolean([])); // false

// TypeScript에서 타입 가드로 사용
function processValue(value: unknown) {
  if (isBoolean(value)) {
    // value는 boolean으로 타입이 좁혀져요
    console.log(value ? '참이에요' : '거짓이에요');
  } else {
    console.log('불린 값이 아니에요');
  }
}

// 조건부 로직에서 활용
function handleUserInput(input: unknown) {
  if (isBoolean(input)) {
    return input ? 'ON' : 'OFF';
  }
  return '알 수 없는 상태';
}

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
