# words

문자열을 단어 단위로 나누어 배열로 반환해요.

```typescript
const result = words(str);
```

## 레퍼런스

### `words(str)`

문자열을 개별 단어로 분리하고 싶을 때 `words`를 사용하세요. camelCase, kebab-case, 공백, 구두점 등을 기준으로 단어를 나누고, 이모지와 유니코드 문자도 올바르게 인식해요. 다양한 명명 규칙의 문자열을 처리할 때 유용해요.

```typescript
import { words } from 'es-toolkit/string';

// 구두점과 공백으로 구분된 문자열을 단어로 나눠요
words('fred, barney, & pebbles');
// 반환 값: ['fred', 'barney', 'pebbles']

// camelCase와 연속된 대문자를 올바르게 분리해요
words('camelCaseHTTPRequest🚀');
// 반환 값: ['camel', 'Case', 'HTTP', 'Request', '🚀']

// 유니코드 문자와 숫자도 처리해요
words('Lunedì 18 Set');
// 반환 값: ['Lunedì', '18', 'Set']
```

다양한 상황에서 문자열을 단어로 분리할 때 활용할 수 있어요:

```typescript
// 변수명을 단어로 분리해서 다른 명명 규칙으로 변환해요
const variableName = 'getUserProfile';
const wordList = words(variableName);
console.log(wordList); // ['get', 'User', 'Profile']

// snake_case를 단어로 분리해요
const snakeCase = 'user_profile_data';
const snakeWords = words(snakeCase);
console.log(snakeWords); // ['user', 'profile', 'data']

// kebab-case를 단어로 분리해요
const kebabCase = 'user-profile-data';
const kebabWords = words(kebabCase);
console.log(kebabWords); // ['user', 'profile', 'data']

// 복잡한 문자열도 처리해요
const complex = 'XMLHttpRequest2.0_parser-v1.2';
const complexWords = words(complex);
console.log(complexWords); // ['XML', 'Http', 'Request', '2', '0', 'parser', 'v', '1', '2']
```

#### 파라미터

- `str` (`string`): 단어로 분리할 문자열이에요.

#### 반환 값

(`string[]`): 문자열을 단어 단위로 나눈 배열을 반환해요.

## Lodash 호환성

`es-toolkit/compat`에서 `words`를 가져오면 lodash와 호환돼요.

- `words`에서 문자열을 분리하는 정규식을 바꾸기 위해서 두 번째 파라미터 `pattern`을 제공할 수 있어요.
- `words`는 첫 번째 파라미터가 문자열이 아닌 경우, 자동으로 문자열로 바꿔요.

```typescript
import { words } from 'es-toolkit/compat';

words('fred, barney, & pebbles', /[^, ]+/g);
// 반환 값: ['fred', 'barney', '&', 'pebbles']
```
