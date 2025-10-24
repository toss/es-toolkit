# kebabCase

문자열을 케밥 표기법으로 변환해요.

```typescript
const result = kebabCase(str);
```

## 레퍼런스

### `kebabCase(str)`

문자열을 케밥 표기법으로 변환하고 싶을 때 `kebabCase`를 사용하세요. 케밥 표기법은 각 단어를 소문자로 쓰고 단어 사이를 대시(-)로 연결하는 명명 규칙이에요.

```typescript
import { kebabCase } from 'es-toolkit/string';

// 카멜 케이스를 케밥 케이스로 변환해요
kebabCase('camelCase');
// 결과: 'camel-case'

// 공백이 있는 문자열을 변환해요
kebabCase('some whitespace');
// 결과: 'some-whitespace'

// 이미 케밥 케이스인 문자열은 그대로 유지해요
kebabCase('hyphen-text');
// 결과: 'hyphen-text'

// 대문자로 된 문자열을 변환해요
kebabCase('HTTPRequest');
// 결과: 'http-request'
```

이 함수는 API 엔드포인트나 CSS 클래스 이름, HTML 속성 등을 만들 때 유용해요.

#### 파라미터

- `str` (`string`): 케밥 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 케밥 표기법으로 변환된 문자열이에요.
