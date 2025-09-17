# repeat (Lodash 호환성)

::: warning JavaScript의 `String.prototype.repeat`을 사용하세요

이 `repeat` 함수는 문자열이 아닌 값 처리와 정수 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.repeat`을 사용하세요.

:::

문자열을 지정된 횟수만큼 반복해요.

```typescript
const repeated = repeat(str, n);
```

## 레퍼런스

### `repeat(str, n?)`

문자열을 여러 번 반복해서 새로운 문자열을 만들고 싶을 때 `repeat`을 사용하세요. 반복 횟수가 1보다 작으면 빈 문자열을 반환해요.

```typescript
import { repeat } from 'es-toolkit/compat';

// 문자열 반복
repeat('abc', 2);
// Returns: 'abcabc'

repeat('hello', 3);
// Returns: 'hellohellohello'

// 0번 반복하면 빈 문자열
repeat('abc', 0);
// Returns: ''
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { repeat } from 'es-toolkit/compat';

repeat(null, 3);
// Returns: ''

repeat(undefined, 2);
// Returns: ''
```

반복 횟수를 지정하지 않으면 1번 반복해요.

```typescript
import { repeat } from 'es-toolkit/compat';

repeat('abc');
// Returns: 'abc'
```

#### 파라미터

- `str` (`string`, 선택): 반복할 문자열이에요.
- `n` (`number`, 선택): 반복할 횟수예요. 기본값은 `1`이에요.

### 반환 값

(`string`): 지정된 횟수만큼 반복된 문자열을 반환해요.