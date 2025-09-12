# lowerCase

문자열을 소문자 표기법으로 변환해요.

```typescript
const result = lowerCase(str);
```

## 레퍼런스

### `lowerCase(str)`

문자열을 소문자 표기법으로 바꾸고 싶을 때 `lowerCase`를 사용하세요. 소문자 표기법은 모든 단어를 소문자로 쓰고 단어 사이를 공백으로 구분하는 명명 규칙이에요.

```typescript
import { lowerCase } from 'es-toolkit/string';

// 다양한 형태의 문자열을 소문자 표기법으로 변환
lowerCase('Hello World'); // returns 'hello world'
lowerCase('camelCase'); // returns 'camel case'
lowerCase('some-kebab-case'); // returns 'some kebab case'
lowerCase('PascalCase'); // returns 'pascal case'
lowerCase('SCREAMING_SNAKE_CASE'); // returns 'screaming snake case'
```

사용자에게 보여주는 텍스트나 제목을 만들 때 유용해요.

```typescript
import { lowerCase } from 'es-toolkit/string';

// 사용자 인터페이스 텍스트 생성
const fieldName = 'firstName';
const label = lowerCase(fieldName); // 'first name'

// API 키를 사용자 친화적 텍스트로 변환
const apiKeys = ['userEmail', 'phoneNumber', 'birthDate'];
const labels = apiKeys.map(key => lowerCase(key));
// returns ['user email', 'phone number', 'birth date']
```

설정이나 옵션 이름을 표시할 때도 활용할 수 있어요.

```typescript
import { lowerCase } from 'es-toolkit/string';

// 설정 메뉴 표시
const settings = {
  'enableNotifications': true,
  'darkModeEnabled': false,
  'autoSaveInterval': 300
};

for (const [key, value] of Object.entries(settings)) {
  const displayName = lowerCase(key);
  console.log(`${displayName}: ${value}`);
}
// 출력:
// enable notifications: true
// dark mode enabled: false
// auto save interval: 300
```

특수 문자나 공백이 있는 문자열도 적절히 처리해요.

```typescript
import { lowerCase } from 'es-toolkit/string';

lowerCase('HTTPSConnection'); // returns 'https connection'
lowerCase('user_profile-settings'); // returns 'user profile settings'
lowerCase('  mixed   CASE   text  '); // returns 'mixed case text'
```

#### 파라미터

- `str` (`string`): 소문자 표기법으로 변환할 문자열이에요.

#### 반환 값

(`string`): 소문자 표기법으로 변환된 새로운 문자열을 반환해요.
