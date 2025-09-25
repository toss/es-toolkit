# split (Lodash 호환성)

::: warning JavaScript의 `String.prototype.split`을 사용하세요

이 `split` 함수는 `null`이나 `undefined` 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript의 `String.prototype.split`을 사용하세요.

:::

문자열을 구분자로 나누어서 배열을 만들어요.

```typescript
const segments = split(str, separator);
```

## 레퍼런스

### `split(string, separator?, limit?)`

문자열을 특정 구분자로 나누어서 배열로 만들고 싶을 때 `split`을 사용하세요. 결과 배열의 최대 길이도 제한할 수 있어요.

```typescript
import { split } from 'es-toolkit/compat';

// 하이픈으로 나누기
split('a-b-c', '-');
// Returns: ['a', 'b', 'c']

// 결과 개수 제한하기
split('a-b-c-d', '-', 2);
// Returns: ['a', 'b']

// 정규식으로 나누기
split('hello world', /\s/);
// Returns: ['hello', 'world']
```

구분자를 지정하지 않으면 문자열 전체가 배열의 첫 번째 요소가 돼요.

```typescript
import { split } from 'es-toolkit/compat';

split('hello');
// Returns: ['hello']
```

`null`이나 `undefined`는 빈 문자열로 처리해요.

```typescript
import { split } from 'es-toolkit/compat';

split(null);
// Returns: ['']

split(undefined);
// Returns: ['']
```

#### 파라미터

- `string` (`string`, 선택): 나눌 문자열이에요. 기본값은 빈 문자열이에요.
- `separator` (`RegExp | string`, 선택): 나누는 기준이 되는 구분자예요.
- `limit` (`number`, 선택): 결과 배열의 최대 길이예요.

#### 반환 값

(`string[]`): 구분자로 나누어진 문자열 배열을 반환해요.
