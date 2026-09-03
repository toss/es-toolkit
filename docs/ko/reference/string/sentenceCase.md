# sentenceCase

문자열을 문장 케이스로 변환해요.

```typescript
const converted = sentenceCase(str);
```

## 사용법

### `sentenceCase(str)`

문자열을 문장 케이스로 변환하고 싶을 때 `sentenceCase`를 사용하세요. 문장 케이스는 첫 단어의 첫 글자만 대문자로 쓰고, 나머지 글자는 모두 소문자로 쓰며, 단어 사이를 공백으로 연결하는 표기법이에요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 기본 사용법
sentenceCase('hello world'); // 'Hello world'
sentenceCase('HELLO WORLD'); // 'Hello world'

// 카멜 케이스나 파스칼 케이스 변환
sentenceCase('fooBar'); // 'Foo bar'
sentenceCase('PascalCase'); // 'Pascal case'

// 하이픈이나 언더스코어로 연결된 단어들
sentenceCase('hello-world'); // 'Hello world'
sentenceCase('hello_world'); // 'Hello world'
```

필드 이름이나 enum 값 같은 식별자를 사람이 읽기 좋은 레이블로 바꿀 때 유용해요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

sentenceCase('firstName'); // 'First name'
sentenceCase('MAX_RETRY_COUNT'); // 'Max retry count'
sentenceCase('user-profile-settings'); // 'User profile settings'
```

다양한 구분자와 특수 문자가 포함된 문자열도 올바르게 처리해요.

```typescript
import { sentenceCase } from 'es-toolkit/string';

// 여러 구분자가 포함된 경우
sentenceCase('--foo-bar--'); // 'Foo bar'
sentenceCase('__FOO_BAR__'); // 'Foo bar'

// 연속된 대문자와 숫자 처리
sentenceCase('XMLHttpRequest'); // 'Xml http request'
sentenceCase('_abc_123_def'); // 'Abc 123 def'

// 빈 문자나 의미 없는 구분자만 있는 경우
sentenceCase('_-_-_-_'); // ''
sentenceCase('12abc 12ABC'); // '12 abc 12 abc'
```

#### 파라미터

- `str` (`string`): 문장 케이스로 변환할 문자열이에요.

#### 반환 값

(`string`): 첫 단어의 첫 글자는 대문자로, 나머지는 소문자로 변환되고 공백으로 연결된 새로운 문자열을 반환해요.

## 사용해보기

::: sandpack

```ts index.ts
import { sentenceCase } from 'es-toolkit/string';

console.log(sentenceCase('sentenceCase'));
```

:::
