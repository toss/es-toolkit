# isString

주어진 값이 문자열인지 확인해요.

```typescript
const result = isString(value);
```

## 레퍼런스

### `isString(value)`

값이 문자열인지 확인하고 싶을 때 `isString`을 사용하세요. 문자열 타입을 다른 원시 타입이나 객체와 구분할 때 유용해요.

```typescript
import { isString } from 'es-toolkit/predicate';

// 문자열 값들
console.log(isString('hello')); // true
console.log(isString('')); // true
console.log(isString('123')); // true
console.log(isString('true')); // true

// 문자열이 아닌 값들
console.log(isString(123)); // false
console.log(isString(true)); // false
console.log(isString(null)); // false
console.log(isString(undefined)); // false
console.log(isString([])); // false
console.log(isString({})); // false
console.log(isString(new String('hello'))); // false (String 객체)
```

데이터 검증과 타입 안전한 문자열 처리에 유용해요:

```typescript
// 안전한 문자열 조작
function processText(input: unknown): string {
  if (isString(input)) {
    // TypeScript가 input을 string으로 추론
    return input.trim().toLowerCase();
  }

  // 다른 타입은 문자열로 변환
  return String(input);
}

// 사용 예시
console.log(processText('  HELLO  ')); // 'hello'
console.log(processText(123)); // '123'
console.log(processText(true)); // 'true'
console.log(processText(null)); // 'null'

// 폼 데이터 검증
function validateForm(data: Record<string, unknown>) {
  const errors: string[] = [];

  if (!isString(data.name) || data.name.length === 0) {
    errors.push('이름은 필수 입력 항목입니다');
  }

  if (!isString(data.email) || !data.email.includes('@')) {
    errors.push('유효한 이메일을 입력해주세요');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// 사용 예시
console.log(validateForm({ name: 'John', email: 'john@example.com' }));
// { isValid: true, errors: [] }

console.log(validateForm({ name: 123, email: 'invalid-email' }));
// { isValid: false, errors: ['이름은 필수 입력 항목입니다', '유효한 이메일을 입력해주세요'] }
```

#### 파라미터

- `value` (`unknown`): 문자열인지 확인할 값이에요.

#### 반환 값

(`value is string`): 값이 문자열이면 `true`, 그렇지 않으면 `false`를 반환해요.
