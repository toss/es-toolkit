# constantCase

문자열을 상수 표기법으로 변환해요.

```typescript
const result = constantCase(str);
```

## 레퍼런스

### `constantCase(str)`

문자열을 상수 표기법으로 바꾸고 싶을 때 `constantCase`를 사용하세요. 상수 표기법은 모든 문자를 대문자로 쓰고 단어 사이를 밑줄(`_`)로 구분하는 명명 규칙이에요.

```typescript
import { constantCase } from 'es-toolkit/string';

// 다양한 형태의 문자열을 상수 표기법으로 변환
constantCase('hello world'); // returns 'HELLO_WORLD'
constantCase('camelCase'); // returns 'CAMEL_CASE'
constantCase('some-kebab-case'); // returns 'SOME_KEBAB_CASE'
constantCase('PascalCase'); // returns 'PASCAL_CASE'
constantCase('snake_case'); // returns 'SNAKE_CASE'
```

자바스크립트나 다른 프로그래밍 언어에서 상수를 정의할 때 자주 사용하는 명명 규칙이에요.

```typescript
import { constantCase } from 'es-toolkit/string';

// 환경 변수명 생성
const configKey = 'api base url';
const envVar = constantCase(configKey); // 'API_BASE_URL'

// 상수명 생성
const settingName = 'maximum retry count';
const constantName = constantCase(settingName); // 'MAXIMUM_RETRY_COUNT'
```

공백이나 특수 문자가 포함된 문자열도 적절히 처리해요.

```typescript
import { constantCase } from 'es-toolkit/string';

constantCase('HTTP Request'); // returns 'HTTP_REQUEST'
constantCase('user-agent-string'); // returns 'USER_AGENT_STRING'
constantCase('  multiple   spaces  '); // returns 'MULTIPLE_SPACES'
```

#### 파라미터

- `str` (`string`): 상수 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 상수 표기법으로 변환된 새로운 문자열을 반환해요.
