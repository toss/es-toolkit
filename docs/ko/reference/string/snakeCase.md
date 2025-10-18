# snakeCase

문자열을 스네이크 표기법으로 변환해요.

```typescript
const converted = snakeCase(str);
```

## 레퍼런스

### `snakeCase(str)`

문자열을 스네이크 표기법으로 변환하고 싶을 때 `snakeCase`를 사용하세요. 스네이크 표기법은 각 단어를 소문자로 작성하고 단어 사이를 밑줄(\_)로 연결하는 명명 규칙이에요.

```typescript
import { snakeCase } from 'es-toolkit/string';

// 기본 사용법
snakeCase('camelCase'); // 'camel_case'
snakeCase('some whitespace'); // 'some_whitespace'

// 하이픈이나 다른 구분자로 연결된 단어들
snakeCase('hyphen-text'); // 'hyphen_text'
snakeCase('PascalCase'); // 'pascal_case'

// 연속된 대문자 처리
snakeCase('HTTPRequest'); // 'http_request'
snakeCase('XMLHttpRequest'); // 'xml_http_request'
```

다양한 구분자가 포함된 문자열도 올바르게 처리해요.

```typescript
import { snakeCase } from 'es-toolkit/string';

// 여러 구분자가 섞인 경우
snakeCase('camelCase-with_mixed.separators'); // 'camel_case_with_mixed_separators'

// 숫자가 포함된 경우
snakeCase('version2.1.0'); // 'version_2_1_0'

// 특수 문자가 포함된 경우
snakeCase('user@email.com'); // 'user_email_com'
```

#### 파라미터

- `str` (`string`): 스네이크 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 스네이크 표기법으로 변환된 새로운 문자열을 반환해요.
