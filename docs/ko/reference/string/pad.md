# pad

문자열의 양쪽에 문자를 추가해서 지정한 길이로 만들어요.

```typescript
const padded = pad(str, length, chars);
```

## 사용법

### `pad(str, length, chars?)`

문자열이 지정한 길이보다 짧을 때 양쪽에 문자를 추가해서 길이를 맞추고 싶을 때 `pad`를 사용하세요. 양쪽에 똑같이 나누어 추가할 수 없다면 오른쪽이 한 글자 더 길게 패딩돼요.

```typescript
import { pad } from 'es-toolkit/string';

// 기본 공백으로 패딩하기
pad('abc', 8);
// => '  abc   '

// 사용자 정의 문자로 패딩하기
pad('abc', 8, '_-');
// => '_-abc_-_'

// 문자열이 이미 목표 길이보다 길거나 같을 때
pad('abc', 3);
// => 'abc'

pad('abcdef', 3);
// => 'abcdef'
```

패딩 문자가 목표 길이에 균등하게 분배될 수 없을 때는 오른쪽이 더 길어져요.

```typescript
import { pad } from 'es-toolkit/string';

pad('abc', 9, '123');
// => '123abc123' (왼쪽 3글자, 오른쪽 3글자)

pad('abc', 10, '123');
// => '123abc1231' (왼쪽 3글자, 오른쪽 4글자)
```

#### 파라미터

- `str` (`string`): 패딩할 문자열이에요.
- `length` (`number`): 목표 길이예요.
- `chars` (`string`, 선택): 패딩에 사용할 문자예요. 기본값은 `' '`이에요.

#### 반환 값

(`string`): 패딩된 문자열을 반환해요.
