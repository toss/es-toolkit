# camelCase

문자열을 카멜 표기법(Camel case)으로 변환해요.

```typescript
const result = camelCase(str);
```

## 레퍼런스

### `camelCase(str)`

문자열을 카멜 표기법으로 바꾸고 싶을 때 `camelCase`를 사용하세요. 카멜 표기법은 첫 번째 단어를 소문자로 쓰고, 나머지 단어들의 첫 글자를 대문자로 연결하는 명명 규칙이에요.

```typescript
import { camelCase } from 'es-toolkit/string';

// 다양한 형태의 문자열을 카멜 표기법으로 변환
camelCase('hello world'); // returns 'helloWorld'
camelCase('some-hyphen-text'); // returns 'someHyphenText'
camelCase('CONSTANT_CASE'); // returns 'constantCase'
camelCase('PascalCase'); // returns 'pascalCase'
camelCase('mixed   SpAcE'); // returns 'mixedSpAcE'
```

특수 문자나 공백, 하이픈 같은 구분자가 있는 문자열을 자바스크립트 변수명이나 객체 프로퍼티명으로 사용하기 좋은 형태로 바꿔줘요.

```typescript
import { camelCase } from 'es-toolkit/string';

// API 응답에서 받은 키를 변환
const apiKey = 'user_first_name';
const jsKey = camelCase(apiKey); // 'userFirstName'

// HTML 속성을 자바스크립트 프로퍼티로 변환
const cssProperty = 'background-color';
const jsProperty = camelCase(cssProperty); // 'backgroundColor'
```

유니코드 문자도 보존해요.

```typescript
import { camelCase } from 'es-toolkit/string';

camelCase('keep unicode 😅'); // returns 'keepUnicode😅'
camelCase('한글-테스트'); // returns '한글테스트'
```

#### 파라미터

- `str` (`string`): 카멜 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 카멜 표기법으로 변환된 새로운 문자열을 반환해요.
