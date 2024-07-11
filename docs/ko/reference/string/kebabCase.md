# kebabCase

문자열을 케밥 표기법으로 변환합니다.

케밥 표기법은 여러 단어로 구성된 식별자의 각 단어를 소문자로 쓰고 단어를 대시(\-)로 연결하는 명명 규칙입니다. 예를 들어 `kebab-case`와 같이 작성하세요.

## 인터페이스

```typescript
function kebabCase(str: string): string;
```

### 파라미터

- `str` (`string`): 케밥 대소문자로 변환할 문자열입니다.

### 반환 값

(`string`) 케밥 대소문자로 변환된 문자열입니다.

## 예시

```typescript
import { kebabCase } from 'es-toolkit/string';

kebabCase('camelCase'); // returns 'camel-case'
kebabCase('some whitespace'); // returns 'some-whitespace'
kebabCase('hyphen-text'); // returns 'hyphen-text'
kebabCase('HTTPRequest'); // returns 'http-request'
```
