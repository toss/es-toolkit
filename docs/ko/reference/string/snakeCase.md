# snakeCase

문자열을 스네이크 표기법으로 변환해요.

스네이크 표기법은 여러 단어로 구성된 식별자에서 각 단어를 소문자로 작성하고, 단어 사이를 밑줄(\_)로 연결하는 명명 규칙이에요. 예를 들어서, `snake_case` 처럼 작성해요.

## 인터페이스

```typescript
function snakeCase(str: string): string;
```

### 파라미터

- `str` (`string`): 스네이크 케이스로 변환할 문자열입니다.

### 반환 값

(`string`) 스네이크 케이스로 변환된 문자열입니다.

## 예시

```typescript
import { snakeCase } from 'es-toolkit/string';

snakeCase('camelCase'); // returns 'camel_case'
snakeCase('some whitespace'); // returns 'some_whitespace'
snakeCase('hyphen-text'); // returns 'hyphen_text'
snakeCase('HTTPRequest'); // returns 'http_request'
```
