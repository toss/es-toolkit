# trimStart

문자열의 시작에 있는 공백이나 지정한 문자를 제거해요.

```typescript
const trimmed = trimStart(str, chars);
```

## 레퍼런스

### `trimStart(str, chars?)`

문자열의 시작 부분에서 불필요한 문자를 제거하고 싶을 때 `trimStart`를 사용하세요. 특정 문자를 지정하지 않으면 공백 문자를 제거해요.

```typescript
import { trimStart } from 'es-toolkit/string';

// 기본 공백 제거
trimStart('  hello'); // 'hello'
trimStart('\t\n  hello'); // 'hello'

// 특정 문자 제거
trimStart('---hello', '-'); // 'hello'
trimStart('000123', '0'); // '123'
trimStart('abcabcabc', 'a'); // 'bcabcabc'
```

여러 문자를 배열로 지정하면 그 중 하나라도 해당하는 문자는 모두 제거해요.

```typescript
import { trimStart } from 'es-toolkit/string';

// 여러 문자를 배열로 지정
trimStart('!!@@hello', ['!', '@']); // 'hello'

// 숫자와 특수 문자 제거
trimStart('123abc', ['1', '2', '3']); // 'abc'

// 문자와 공백을 함께 제거
trimStart('  __hello', ['_', ' ']); // 'hello'
```

#### 파라미터

- `str` (`string`): 시작에서 문자를 제거할 문자열이에요.
- `chars` (`string | string[]`, 선택): 제거할 문자예요. 문자열이나 문자 배열을 사용할 수 있어요. 기본값은 공백 문자예요.

#### 반환 값

(`string`): 지정한 문자가 시작에서 제거된 새로운 문자열을 반환해요.
