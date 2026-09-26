# stringifySearch

객체를 URL 뒤에 붙일 `?a=1&b=2` 형태의 문자열로 바꿔요.

```typescript
const search = stringifySearch(query);
```

## 사용법

### `stringifySearch(query)`

URL에 쿼리 파라미터를 붙이고 싶을 때 `stringifySearch`를 사용하세요. `?`로 시작하는 문자열을 반환하기 때문에 경로 뒤에 그대로 붙일 수 있어요. 붙일 값이 없으면 빈 문자열을 반환해요.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 객체를 쿼리 문자열로 바꿔요.
stringifySearch({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world'를 반환해요

// 경로 뒤에 붙여요. 값이 `undefined`인 키는 빠져요.
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// '/items?page=1'을 반환해요

// 붙일 값이 없으면 경로가 그대로 남아요.
`/items${stringifySearch({ ref: undefined })}`;
// '/items'를 반환해요
```

각 값은 다음과 같이 바뀌어요.

| 값                     | 입력                        | 결과                  |
| ---------------------- | --------------------------- | --------------------- |
| 문자열                 | `{ q: 'a b+c' }`            | `'?q=a%20b%2Bc'`      |
| 빈 문자열              | `{ q: '' }`                 | `'?q='`               |
| 숫자, 불리언, `BigInt` | `{ page: 1, open: true }`   | `'?page=1&open=true'` |
| `null`, `undefined`    | `{ a: null, b: undefined }` | `''`                  |
| 배열                   | `{ tags: ['a', 'b'] }`      | `'?tags=a&tags=b'`    |
| 빈 배열                | `{ tags: [] }`              | `''`                  |

키와 값은 `encodeURIComponent`로 인코딩해요. 공백은 `%20`, `+`는 `%2B`가 되기 때문에 결과를 `URLSearchParams`로 읽든 `decodeURIComponent`로 읽든 같은 값이 나와요.

객체 안에 들어 있는 객체나 `Date`는 지원하지 않고, 넣으면 타입 에러가 나요. `JSON.stringify()`나 `toISOString()` 같은 방법으로 먼저 문자열로 바꿔 주세요.

앞의 `?` 없이 쿼리만 필요하면 `.slice(1)`을 사용하세요.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 앞의 `?`를 떼요.
stringifySearch({ page: 1 }).slice(1);
// 'page=1'을 반환해요
```

#### 파라미터

- `query` (`T`): 바꿀 객체. 각 값은 문자열, 숫자, 불리언, `BigInt`, `null`, `undefined`이거나 이 값들의 배열이어야 해요.

#### 반환 값

(`string`): `?`로 시작하는 문자열. 붙일 값이 없으면 빈 문자열이에요.

#### 에러

(`URIError`): 이모지를 반으로 자른 것처럼 깨진 문자가 키나 값에 들어 있으면 에러가 발생해요.
