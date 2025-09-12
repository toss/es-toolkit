# isDate

주어진 값이 `Date` 객체인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Date`로 좁혀요.

## 인터페이스

```typescript
function isDate(value: unknown): value is Date;
```

### 파라미터

- `value` (`unknown`): `Date` 객체인지 확인할 값이에요.

### 반환 값

(`value is Date`): 값이 `Date` 객체이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isDate } from 'es-toolkit/predicate';

// Date 객체 확인
const date = new Date();
console.log(isDate(date)); // true

// 다른 타입들과 구분
console.log(isDate('2024-01-01')); // false
console.log(isDate(1640995200000)); // false - 타임스탬프
console.log(isDate({})); // false
console.log(isDate(null)); // false
console.log(isDate(undefined)); // false
console.log(isDate([])); // false

// TypeScript에서 타입 가드로 사용
function formatDate(value: unknown): string {
  if (isDate(value)) {
    // value는 Date로 타입이 좁혀져요
    return value.toISOString();
  }
  return '유효하지 않은 날짜';
}

// API 응답 처리
interface APIResponse {
  createdAt: unknown;
  updatedAt: unknown;
}

function processResponse(response: APIResponse) {
  if (isDate(response.createdAt)) {
    console.log(`생성 시간: ${response.createdAt.toLocaleDateString()}`);
  }
  
  if (isDate(response.updatedAt)) {
    console.log(`수정 시간: ${response.updatedAt.toLocaleDateString()}`);
  }
}

// 날짜 유효성 검증
function validateInput(input: unknown): Date | null {
  if (isDate(input)) {
    // Date 메서드를 안전하게 사용할 수 있어요
    if (input.getTime() > 0) {
      return input;
    }
  }
  return null;
}

// 날짜 비교
function isValidBirthDate(value: unknown): boolean {
  if (isDate(value)) {
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());
    
    return value <= now && value >= minAge;
  }
  return false;
}

// 날짜 포맷팅
function getDateInfo(value: unknown) {
  if (isDate(value)) {
    return {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
      formatted: value.toLocaleDateString('ko-KR')
    };
  }
  return null;
}
```
