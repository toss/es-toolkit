# upperFirst

문자열의 첫 번째 글자를 대문자로 변환해요.

```typescript
const result = upperFirst(str);
```

## 사용법

### `upperFirst(str)`

문자열의 첫 글자만 대문자로 바꾸고 싶을 때 `upperFirst`를 사용하세요. 나머지 글자들은 그대로 유지해요. 문장의 시작을 대문자로 만들거나 이름을 정리할 때 유용해요.

```typescript
import { upperFirst } from 'es-toolkit/string';

// 소문자로 시작하는 문자열의 첫 글자를 대문자로 만들어요
upperFirst('fred');
// 반환 값: 'Fred'

// 이미 첫 글자가 대문자인 경우 그대로 유지해요
upperFirst('Fred');
// 반환 값: 'Fred'

// 모든 글자가 대문자인 경우에도 그대로 유지해요
upperFirst('FRED');
// 반환 값: 'FRED'
```

다양한 상황에서 활용할 수 있어요:

```typescript
// 사용자 이름을 정리할 때
const userName = 'john';
const displayName = upperFirst(userName);
console.log(displayName); // 'John'

// 문장의 첫 글자를 대문자로 만들 때
const sentence = 'hello world';
const capitalizedSentence = upperFirst(sentence);
console.log(capitalizedSentence); // 'Hello world'

// 여러 이름을 처리할 때
const names = ['alice', 'bob', 'charlie'];
const capitalizedNames = names.map(name => upperFirst(name));
console.log(capitalizedNames); // ['Alice', 'Bob', 'Charlie']

// camelCase 문자열의 첫 글자를 대문자로 만들 때
const camelCase = 'firstName';
const pascalCase = upperFirst(camelCase);
console.log(pascalCase); // 'FirstName'
```

#### 파라미터

- `str` (`string`): 첫 글자를 대문자로 바꿀 문자열이에요.

#### 반환 값

(`string`): 첫 번째 글자가 대문자로 변환된 문자열을 반환해요.
