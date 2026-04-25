# truncate (Lodash 호환성)

::: warning JavaScript의 `String.prototype.slice`를 사용하세요

이 `truncate` 함수는 복잡한 유니코드 처리와 정규식 검사로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.slice`를 사용하세요.

:::

문자열이 지정된 최대 길이보다 길면 잘라서 생략 문자를 붙여요.

```typescript
const truncated = truncate(str, options);
```

## 사용법

### `truncate(string, options?)`

긴 문자열을 지정된 길이로 자르고 싶을 때 `truncate`를 사용하세요. 잘린 부분은 생략 문자(기본값: `"..."`)로 대체돼요.

```typescript
import { truncate } from 'es-toolkit/compat';

// 기본 사용법 (최대 30자)
truncate('hi-diddly-ho there, neighborino');
// Returns: 'hi-diddly-ho there, neighbo...'

// 길이 지정
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// Returns: 'hi-diddly-ho there, n...'

// 생략 문자 변경
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// Returns: 'hi-diddly-ho there, neig [...]'
```

구분자를 지정하면 해당 위치에서 자를 수 있어요.

```typescript
import { truncate } from 'es-toolkit/compat';

// 공백 구분자로 단어 단위로 자르기
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// Returns: 'hi-diddly-ho there,...'

// 정규식으로 구분자 지정
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: /,? +/,
});
// Returns: 'hi-diddly-ho there...'
```

유니코드 문자도 올바르게 처리해요.

```typescript
import { truncate } from 'es-toolkit/compat';

truncate('¥§✈✉🤓', { length: 5 });
// Returns: '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// Returns: '¥§✈…'
```

#### 파라미터

- `string` (`string`, 선택): 자를 문자열이에요.
- `options` (`object`, 선택): 설정 객체예요.
  - `options.length` (`number`, 선택): 최대 문자열 길이예요. 기본값은 `30`이에요.
  - `options.omission` (`string`, 선택): 생략을 나타내는 문자열이에요. 기본값은 `'...'`이에요.
  - `options.separator` (`RegExp | string`, 선택): 자를 위치를 결정하는 구분자예요.

#### 반환 값

(`string`): 잘린 문자열을 반환해요.
