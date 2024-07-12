# lowerCase

문자열을 소문자 표기법으로 변환해요.

소문자 표기법은 여러 단어로 구성된 식별자의 각 단어를 소문자로 쓰고, 단어를 공백( )으로 연결하는 명명 규칙입니다. 예를 들어 `lower case`처럼 써요.

## 인터페이스

```typescript
function lowerCase(str: string): string;
```

### 파라미터

- `str` (`string`): 소문자로 변환할 문자열이에요.

### 반환 값

(`string`) 소문자로 변환된 문자열이에요.

## 예시

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('camelCase'); // returns 'camel case'
lowerCase('some whitespace'); // returns 'some whitespace'
lowerCase('hyphen-text'); // returns 'hyphen text'
lowerCase('HTTPRequest'); // returns 'http request'
```
