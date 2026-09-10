# sentenceCase

문자열을 문장 표기법(Sentence case)으로 변환해요.

```typescript
const result = sentenceCase(str);
```

## 사용법

### `sentenceCase(str)`

문자열을 문장 표기법으로 바꾸고 싶을 때 `sentenceCase`를 사용하세요. 문장 표기법은 첫 번째 단어의 첫 글자만 대문자로 쓰고, 나머지 글자는 모두 소문자로 쓰며, 단어 사이를 공백으로 연결하는 명명 규칙이에요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 다양한 형태의 문자열을 문장 표기법으로 변환
sentenceCase('hello world'); // returns 'Hello world'
sentenceCase('some-hyphen-text'); // returns 'Some hyphen text'
sentenceCase('CONSTANT_CASE'); // returns 'Constant case'
sentenceCase('PascalCase'); // returns 'Pascal case'
sentenceCase('mixed   SpAcE'); // returns 'Mixed sp ac e'
```

프로퍼티 이름이나 enum 값, 설정 키 같은 식별자를 사람이 읽기 좋은 레이블이나 메시지로 사용하기 좋은 형태로 바꿔줘요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 프로퍼티 이름을 폼 레이블로 변환
const fieldName = 'user_first_name';
const label = sentenceCase(fieldName); // 'User first name'

// 상수 이름을 화면에 표시할 텍스트로 변환
const errorCode = 'MAX_RETRY_COUNT';
const message = sentenceCase(errorCode); // 'Max retry count'
```

유니코드 문자도 보존해요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('keep unicode 😅'); // returns 'Keep unicode 😅'
sentenceCase('한글-테스트'); // returns '한글 테스트'
```

#### 파라미터

- `str` (`string`): 문장 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 문장 표기법으로 변환된 새로운 문자열을 반환해요.
