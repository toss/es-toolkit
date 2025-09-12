# isError

주어진 값이 `Error` 객체인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Error`로 좁혀요.

## 인터페이스

```typescript
function isError(value: unknown): value is Error;
```

### 파라미터

- `value` (`unknown`): `Error` 객체인지 확인할 값이에요.

### 반환 값

(`value is Error`): 값이 `Error` 객체이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isError } from 'es-toolkit/predicate';

// Error 객체 확인
console.log(isError(new Error('Something went wrong'))); // true
console.log(isError(new TypeError('Type error'))); // true
console.log(isError(new ReferenceError('Reference error'))); // true

// 다른 타입들과 구분
console.log(isError('error')); // false
console.log(isError({ name: 'Error', message: 'Custom error' })); // false
console.log(isError({ error: true })); // false
console.log(isError(null)); // false
console.log(isError(undefined)); // false

// TypeScript에서 타입 가드로 사용
function handleError(value: unknown) {
  if (isError(value)) {
    // value는 Error로 타입이 좁혀져요
    console.log(`에러 발생: ${value.message}`);
    console.log(`스택 추적: ${value.stack}`);
    return value.name;
  }
  return '에러가 아니에요';
}

// try-catch에서 활용
function processData(data: unknown) {
  try {
    // 일부 처리 로직...
    if (typeof data !== 'object') {
      throw new Error('데이터는 객체여야 해요');
    }
    return data;
  } catch (error) {
    if (isError(error)) {
      console.log(`처리 실패: ${error.message}`);
      throw error; // 에러 다시 던지기
    } else {
      // 예상치 못한 타입의 에러
      console.log('알 수 없는 에러:', error);
      throw new Error('알 수 없는 에러가 발생했어요');
    }
  }
}

// API 응답 처리
interface APIResponse {
  success: boolean;
  data?: any;
  error?: unknown;
}

function handleAPIResponse(response: APIResponse) {
  if (!response.success && isError(response.error)) {
    console.log(`API 에러: ${response.error.message}`);
    return null;
  }
  return response.data;
}

// 커스텀 에러 클래스와 함께
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateInput(input: unknown) {
  try {
    // 검증 로직...
    throw new ValidationError('필수 필드가 누락됐어요', 'email');
  } catch (error) {
    if (isError(error)) {
      console.log(`검증 에러: ${error.name} - ${error.message}`);
      
      // 특정 에러 타입 확인
      if (error instanceof ValidationError) {
        console.log(`문제가 된 필드: ${error.field}`);
      }
    }
  }
}

// 에러 로깅 함수
function logError(error: unknown, context: string) {
  if (isError(error)) {
    console.error(`[${context}] ${error.name}: ${error.message}`);
    if (error.stack) {
      console.error('스택:', error.stack);
    }
  } else {
    console.error(`[${context}] 알 수 없는 에러:`, error);
  }
}
```
