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
    errors
  };
}

// 사용 예시
console.log(validateForm({ name: 'John', email: 'john@example.com' }));
// { isValid: true, errors: [] }

console.log(validateForm({ name: 123, email: 'invalid-email' }));
// { isValid: false, errors: ['이름은 필수 입력 항목입니다', '유효한 이메일을 입력해주세요'] }
```

문자열 기반 작업과 조건부 처리:

```typescript
// 텍스트 분석 유틸리티
function analyzeText(input: unknown) {
  if (isString(input)) {
    return {
      type: 'string',
      length: input.length,
      wordCount: input.split(/\s+/).length,
      isEmpty: input.trim().length === 0,
      hasNumbers: /\d/.test(input),
      hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(input)
    };
  }
  
  return {
    type: typeof input,
    convertedString: String(input),
    originalValue: input
  };
}

// 사용 예시
console.log(analyzeText('Hello World! 123'));
// {
//   type: 'string',
//   length: 14,
//   wordCount: 2,
//   isEmpty: false,
//   hasNumbers: true,
//   hasSpecialChars: true
// }

console.log(analyzeText(42));
// {
//   type: 'number',
//   convertedString: '42',
//   originalValue: 42
// }

// 검색 및 필터링
function filterStringItems(items: unknown[]): string[] {
  return items.filter(isString);
}

const mixedArray = ['hello', 123, 'world', true, 'test', null, 'end'];
const stringItems = filterStringItems(mixedArray);
console.log(stringItems); // ['hello', 'world', 'test', 'end']

// 문자열 기반 정렬
function sortByStringValue(items: unknown[]) {
  return items
    .filter(isString)
    .sort((a, b) => a.localeCompare(b));
}

const items = [3, 'banana', 1, 'apple', true, 'cherry'];
console.log(sortByStringValue(items)); // ['apple', 'banana', 'cherry']
```

설정과 환경 변수 처리:

```typescript
// 환경 변수 처리
function getEnvConfig(env: Record<string, unknown>) {
  const config: Record<string, string | number | boolean> = {};
  
  for (const [key, value] of Object.entries(env)) {
    if (isString(value)) {
      // 문자열 환경 변수 처리
      if (value.toLowerCase() === 'true') {
        config[key] = true;
      } else if (value.toLowerCase() === 'false') {
        config[key] = false;
      } else if (/^\d+$/.test(value)) {
        config[key] = parseInt(value, 10);
      } else {
        config[key] = value;
      }
    }
  }
  
  return config;
}

// 사용 예시
const env = {
  PORT: '3000',
  DEBUG: 'true',
  MAX_CONNECTIONS: '100',
  APP_NAME: 'MyApp',
  TIMEOUT: 5000 // 숫자값은 무시
};

console.log(getEnvConfig(env));
// {
//   PORT: 3000,
//   DEBUG: true,
//   MAX_CONNECTIONS: 100,
//   APP_NAME: 'MyApp'
// }

// 동적 쿼리 빌더
class QueryBuilder {
  private conditions: string[] = [];
  
  where(field: string, operator: string, value: unknown) {
    if (isString(value)) {
      // 문자열 값은 따옴표로 감싸기
      this.conditions.push(`${field} ${operator} '${value}'`);
    } else {
      // 숫자나 다른 값은 그대로
      this.conditions.push(`${field} ${operator} ${value}`);
    }
    return this;
  }
  
  build(): string {
    return this.conditions.length > 0 
      ? 'WHERE ' + this.conditions.join(' AND ')
      : '';
  }
}

// 사용 예시
const query = new QueryBuilder()
  .where('name', '=', 'John')
  .where('age', '>', 25)
  .where('active', '=', true)
  .build();

console.log(query); // WHERE name = 'John' AND age > 25 AND active = true
```

JSON과 직렬화 처리:

```typescript
// 안전한 JSON 파싱
function safeJSONParse(input: unknown) {
  if (isString(input)) {
    try {
      return {
        success: true,
        data: JSON.parse(input),
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'JSON 파싱 에러'
      };
    }
  }
  
  return {
    success: false,
    data: null,
    error: '입력값이 문자열이 아닙니다'
  };
}

// 사용 예시
console.log(safeJSONParse('{"name": "John", "age": 30}'));
// { success: true, data: { name: 'John', age: 30 }, error: null }

console.log(safeJSONParse('invalid json'));
// { success: false, data: null, error: 'JSON 파싱 에러' }

console.log(safeJSONParse(123));
// { success: false, data: null, error: '입력값이 문자열이 아닙니다' }

// 로깅 시스템
class Logger {
  private formatMessage(message: unknown, level: string): string {
    const timestamp = new Date().toISOString();
    
    if (isString(message)) {
      return `[${timestamp}] [${level}] ${message}`;
    }
    
    // 객체나 다른 타입은 JSON으로 직렬화
    try {
      return `[${timestamp}] [${level}] ${JSON.stringify(message)}`;
    } catch {
      return `[${timestamp}] [${level}] ${String(message)}`;
    }
  }
  
  info(message: unknown) {
    console.log(this.formatMessage(message, 'INFO'));
  }
  
  error(message: unknown) {
    console.error(this.formatMessage(message, 'ERROR'));
  }
}

// 사용 예시
const logger = new Logger();
logger.info('서버가 시작되었습니다'); // [2023-...] [INFO] 서버가 시작되었습니다
logger.error({ code: 500, message: 'Internal Error' }); // [2023-...] [ERROR] {"code":500,"message":"Internal Error"}
```

String 객체와 원시 문자열 구분:

```typescript
// 원시 문자열과 String 객체 구분
function handleStringValue(value: unknown) {
  if (isString(value)) {
    // 원시 문자열
    return {
      type: 'primitive string',
      value: value,
      length: value.length,
      canUseStringMethods: true
    };
  }
  
  if (value instanceof String) {
    // String 객체
    return {
      type: 'String object',
      value: value.valueOf(), // 원시값으로 변환
      length: value.length,
      canUseStringMethods: true
    };
  }
  
  return {
    type: typeof value,
    value: String(value),
    length: String(value).length,
    canUseStringMethods: false
  };
}

// 사용 예시
console.log(handleStringValue('hello'));
// { type: 'primitive string', value: 'hello', length: 5, canUseStringMethods: true }

console.log(handleStringValue(new String('hello')));
// { type: 'String object', value: 'hello', length: 5, canUseStringMethods: true }

console.log(handleStringValue(123));
// { type: 'number', value: '123', length: 3, canUseStringMethods: false }
```

#### 파라미터

- `value` (`unknown`): 문자열인지 확인할 값이에요.

#### 반환 값

(`value is string`): 값이 문자열이면 `true`, 그렇지 않으면 `false`를 반환해요.
