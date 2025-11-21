# trim

문자열의 앞뒤에 있는 공백이나 지정한 문자를 제거해요.

```typescript
const trimmed = trim(str, chars);
```

## 사용법

### `trim(str, chars?)`

문자열의 시작과 끝에서 불필요한 문자를 제거하고 싶을 때 `trim`을 사용하세요. 특정 문자를 지정하지 않으면 공백 문자를 제거해요.

```typescript
import { trim } from 'es-toolkit/string';

// 기본 공백 제거
trim('  hello  '); // 'hello'
trim('\t\n  hello  \r\n'); // 'hello'

// 특정 문자 제거
trim('--hello--', '-'); // 'hello'
trim('***hello***', '*'); // 'hello'

// 여러 문자 중 하나라도 해당하면 제거
trim('##hello##world##', ['#', 'd']); // 'hello##worl'
```

배열로 여러 문자를 지정하면 그 중 하나라도 해당하는 문자는 모두 제거해요.

```typescript
import { trim } from 'es-toolkit/string';

// 여러 문자를 배열로 지정
trim('!!@@hello@@!!', ['!', '@']); // 'hello'

// 숫자와 특수 문자 제거
trim('123abc123', ['1', '2', '3']); // 'abc'

// 문자와 공백을 함께 제거
trim('  __hello__  ', ['_', ' ']); // 'hello'
```

#### 파라미터

- `str` (`string`): 앞뒤에서 문자를 제거할 문자열이에요.
- `chars` (`string | string[]`, 선택): 제거할 문자예요. 문자열이나 문자 배열을 사용할 수 있어요. 기본값은 공백 문자예요.

#### 반환 값

(`string`): 지정한 문자가 앞뒤에서 제거된 새로운 문자열을 반환해요.
