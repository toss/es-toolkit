# capitalize

문자열의 첫 번째 문자를 대문자로 바꾸고, 나머지 문자는 소문자로 바꿔요.

```typescript
const result = capitalize(str);
```

## 레퍼런스

### `capitalize(str)`

문자열의 첫 글자만 대문자로 만들고 나머지는 소문자로 통일하고 싶을 때 `capitalize`을 사용하세요. 이름이나 제목을 정규화할 때 유용해요.

```typescript
import { capitalize } from 'es-toolkit/string';

// 기본 사용법
capitalize('hello'); // returns 'Hello'
capitalize('WORLD'); // returns 'World'
capitalize('javaScript'); // returns 'Javascript'
```

빈 문자열이나 한 글자 문자열도 올바르게 처리해요.

```typescript
import { capitalize } from 'es-toolkit/string';

capitalize(''); // returns ''
capitalize('a'); // returns 'A'
capitalize('A'); // returns 'A'
```

사용자 입력을 정규화하거나 제목을 만들 때 활용할 수 있어요.

```typescript
import { capitalize } from 'es-toolkit/string';

// 사용자 이름 정규화
const userName = 'john DOE';
const formattedName = userName.split(' ').map(capitalize).join(' ');
// returns 'John Doe'

// 제목 만들기
const title = capitalize('welcome to our website');
// returns 'Welcome to our website'
```

#### 파라미터

- `str` (`string`): 첫 글자를 대문자로 바꿀 문자열이에요.

#### 반환 값

(`string`): 첫 글자는 대문자, 나머지는 소문자로 바뀐 새로운 문자열을 반환해요.
