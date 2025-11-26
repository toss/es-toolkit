# isJSON

주어진 값이 유효한 JSON 문자열인지 확인해요.

```typescript
const result = isJSON(value);
```

## 사용법

### `isJSON(value)`

문자열이 유효한 JSON 형식인지 확인하고 싶을 때 `isJSON`을 사용하세요. 이 함수는 `JSON.parse()`로 파싱할 수 있는 문자열인지 검사해요. JSON 명세에 따라 객체, 배열, 문자열, 숫자, 참/거짓 값, `null`을 표현하는 모든 문자열이 유효해요.

```typescript
import { isJSON } from 'es-toolkit/predicate';

// 유효한 JSON 문자열들
console.log(isJSON('{"name":"John","age":30}')); // true
console.log(isJSON('[1,2,3]')); // true
console.log(isJSON('"hello world"')); // true
console.log(isJSON('42')); // true
console.log(isJSON('true')); // true
console.log(isJSON('false')); // true
console.log(isJSON('null')); // true

// 유효하지 않은 JSON 문자열들
console.log(isJSON('undefined')); // false
console.log(isJSON('function() {}')); // false
console.log(isJSON('{name: "John"}')); // false (키에 따옴표 없음)
console.log(isJSON("{'name': 'John'}")); // false (작은따옴표 사용)
console.log(isJSON('{}')); // true (빈 객체는 유효)
console.log(isJSON('[]')); // true (빈 배열은 유효)
```

문자열이 아닌 값들은 모두 `false`를 반환해요:

```typescript
// 문자열이 아닌 값들
console.log(isJSON({ name: 'John' })); // false
console.log(isJSON([1, 2, 3])); // false
console.log(isJSON(42)); // false
console.log(isJSON(true)); // false
console.log(isJSON(null)); // false
console.log(isJSON(undefined)); // false
```

API 응답이나 사용자 입력 검증에서 유용해요:

```typescript
// API 응답 검증
function processApiResponse(response: unknown) {
  if (isJSON(response)) {
    try {
      const data = JSON.parse(response);
      console.log('파싱된 데이터:', data);
      return data;
    } catch (error) {
      // isJSON이 true를 반환했으므로 여기는 실행되지 않음
      console.error('파싱 실패:', error);
    }
  }

  console.log('유효한 JSON 문자열이 아닙니다');
  return null;
}

// 사용자 입력 검증
function validateJsonInput(input: unknown): string | null {
  if (isJSON(input)) {
    // TypeScript가 input을 string으로 타입 추론
    return input;
  }

  throw new Error('입력값은 유효한 JSON 문자열이어야 합니다');
}

// 설정 파일 검증
function loadConfig(configString: unknown) {
  if (isJSON(configString)) {
    const config = JSON.parse(configString);
    return {
      isValid: true,
      config,
      error: null,
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Invalid JSON format',
  };
}
```

복잡한 JSON 구조도 정확히 감지해요:

```typescript
const complexJson = `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1
  }
}`;

console.log(isJSON(complexJson)); // true

// 잘못된 형식들
console.log(isJSON('{ "name": "John", }')); // false (trailing comma)
console.log(isJSON('{ name: "John" }')); // false (unquoted key)
console.log(isJSON("{ 'name': 'John' }")); // false (single quotes)
```

#### 파라미터

- `value` (`unknown`): 유효한 JSON 문자열인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 유효한 JSON 문자열이면 `true`, 그렇지 않으면 `false`를 반환해요.
