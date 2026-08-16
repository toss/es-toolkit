# lowerFirst

문자열의 첫 번째 문자를 소문자로 바꿔요.

```typescript
const result = lowerFirst(str);
```

## 사용법

### `lowerFirst(str)`

문자열의 첫 글자만 소문자로 만들고 싶을 때 `lowerFirst`를 사용하세요. 나머지 문자들은 그대로 유지해요. 변수명이나 프로퍼티명을 카멜 케이스로 만들 때 유용해요.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 기본 사용법
lowerFirst('Hello'); // returns 'hello'
lowerFirst('WORLD'); // returns 'wORLD'
lowerFirst('JavaScript'); // returns 'javaScript'
```

빈 문자열이나 한 글자 문자열도 올바르게 처리해요.

```typescript
import { lowerFirst } from 'es-toolkit/string';

lowerFirst(''); // returns ''
lowerFirst('A'); // returns 'a'
lowerFirst('a'); // returns 'a'
```

카멜 케이스 변환에 활용할 수 있어요.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 클래스명을 인스턴스 변수명으로 변환
const className = 'UserService';
const instanceName = lowerFirst(className); // 'userService'

// 상수명을 카멜 케이스로 변환
const constantName = 'API_BASE_URL';
const camelCase = lowerFirst(constantName.toLowerCase().replace(/_(.)/g, (_, letter) => letter.toUpperCase()));
// 결과적으로 'apiBaseUrl'
```

API 응답이나 데이터 변환에서도 사용할 수 있어요.

```typescript
import { lowerFirst } from 'es-toolkit/string';

// 데이터베이스 컬럼명을 JavaScript 프로퍼티명으로 변환
const dbColumns = ['UserId', 'FirstName', 'LastName', 'EmailAddress'];
const jsProperties = dbColumns.map(column => lowerFirst(column));
// returns ['userId', 'firstName', 'lastName', 'emailAddress']

// 함수명 생성
function createGetter(propertyName: string): string {
  return `get${propertyName}`;
}

function createSetter(propertyName: string): string {
  return `set${propertyName}`;
}

const property = lowerFirst('UserName'); // 'userName'
const getter = createGetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'getUserName'
const setter = createSetter(property.charAt(0).toUpperCase() + property.slice(1)); // 'setUserName'
```

#### 파라미터

- `str` (`string`): 첫 글자를 소문자로 바꿀 문자열이에요.

#### 반환 값

(`string`): 첫 글자가 소문자로 바뀐 새로운 문자열을 반환해요.
