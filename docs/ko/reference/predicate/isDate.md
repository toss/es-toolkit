# isDate

주어진 값이 Date 객체인지 확인해요.

```typescript
const result = isDate(value);
```

## 레퍼런스

### `isDate(value)`

날짜 객체인지 확인하고 싶을 때 `isDate`를 사용하세요. 문자열이나 숫자로 된 날짜 표현과 Date 객체를 구분할 때 유용해요. TypeScript에서 타입 가드로 동작해서 값의 타입을 `Date`로 좁혀줘요.

```typescript
import { isDate } from 'es-toolkit/predicate';

// Date 객체 확인
const date = new Date();
isDate(date); // true

// 다른 타입들과 구분
isDate('2024-01-01'); // false - 문자열
isDate(1640995200000); // false - 타임스탬프
isDate({}); // false
```

TypeScript에서 타입 가드로 사용할 때 특히 유용해요.

```typescript
import { isDate } from 'es-toolkit/predicate';

function formatDate(value: unknown): string {
  if (isDate(value)) {
    // value는 Date로 타입이 좁혀져요
    return value.toISOString();
  }
  return '유효하지 않은 날짜';
}
```

API 응답 처리나 사용자 입력 검증에 활용할 수 있어요.

```typescript
import { isDate } from 'es-toolkit/predicate';

// API 응답 처리
function processResponse(response: { createdAt: unknown }) {
  if (isDate(response.createdAt)) {
    console.log(`생성 시간: ${response.createdAt.toLocaleDateString()}`);
  }
}

// 날짜 유효성 검증
function validateBirthDate(value: unknown): boolean {
  if (isDate(value)) {
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());
    
    return value <= now && value >= minAge;
  }
  return false;
}
```

#### 파라미터

- `value` (`unknown`): Date 객체인지 확인할 값이에요.

#### 반환 값

(`value is Date`): 값이 Date 객체이면 `true`, 그렇지 않으면 `false`를 반환해요.

