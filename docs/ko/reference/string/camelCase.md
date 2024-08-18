# camelCase

문자열을 카멜 표기법으로 변환해요.

카멜 표기법은 여러 단어로 구성된 식별자의 첫 단어를 소문자로 쓰고, 이어지는 단어의 첫 문자를 [대문자](./capitalize.md)로 연결하는 명명 규칙이에요. 예를 들어 `camelCase`와 같이 작성해요.

## 인터페이스

```typescript
function camelCase(str: string): string;
```

### 파라미터

- `str` (`string`): 카멜 표기법으로 변환할 문자열이에요.

### 반환 값

(`string`): 카멜 표기법으로 변환된 문자열이에요.

## 예시

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('camelCase'); // returns 'camelCase'
camelCase('some whitespace'); // returns 'someWhitespace'
camelCase('hyphen-text'); // returns 'hyphenText'
camelCase('HTTPRequest'); // returns 'httpRequest'
```
