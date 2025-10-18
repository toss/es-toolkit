# upperCase

문자열을 모든 글자가 대문자이고 단어가 공백으로 구분된 형태로 변환해요.

```typescript
const result = upperCase(str);
```

## 레퍼런스

### `upperCase(str)`

문자열을 대문자 표기법으로 변환하고 싶을 때 `upperCase`를 사용하세요. 각 단어를 대문자로 바꾸고 단어 사이를 공백으로 연결해요. camelCase, kebab-case, snake_case 등 다양한 표기법의 문자열을 처리할 수 있어요.

```typescript
import { upperCase } from 'es-toolkit/string';

// camelCase를 대문자 표기법으로 변환해요
upperCase('camelCase');
// 반환 값: 'CAMEL CASE'

// 이미 공백이 있는 문자열도 변환해요
upperCase('some whitespace');
// 반환 값: 'SOME WHITESPACE'

// kebab-case를 대문자 표기법으로 변환해요
upperCase('hyphen-text');
// 반환 값: 'HYPHEN TEXT'

// 연속된 대문자가 있는 문자열도 처리해요
upperCase('HTTPSRequest');
// 반환 값: 'HTTPS REQUEST'
```

다양한 명명 규칙을 통일된 대문자 형식으로 변환할 때 유용해요:

```typescript
// API 응답의 다양한 키 이름을 통일해요
const apiKeys = ['user_name', 'firstName', 'email-address', 'phoneNumber'];
const upperCaseKeys = apiKeys.map(key => upperCase(key));
console.log(upperCaseKeys);
// ['USER NAME', 'FIRST NAME', 'EMAIL ADDRESS', 'PHONE NUMBER']

// 파일 이름을 표시할 때 사용해요
const fileName = 'profile_image_thumbnail.jpg';
const displayName = upperCase(fileName.replace('.jpg', ''));
console.log(displayName); // 'PROFILE IMAGE THUMBNAIL'
```

#### 파라미터

- `str` (`string`): 대문자 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 각 단어가 대문자로 변환되고 공백으로 구분된 문자열을 반환해요.
