# stringify

객체를 URL의 쿼리 문자열로 변환해요.

```typescript
const search = stringify(query);
```

## 사용법

### `stringify(query)`

검색어나 페이지 번호를 URL에 담을 때 `stringify`를 사용하세요. 결과는 `?page=1&q=hello`처럼 `?`로 시작하므로 `/items` 같은 경로 뒤에 바로 붙일 수 있어요. 변환할 값이 없으면 빈 문자열을 반환해요.

```typescript
import { stringify } from 'es-toolkit/query-string';

// 객체를 쿼리 문자열로 변환해요.
stringify({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world'를 반환해요

// 배열의 각 값은 같은 키로 추가해요. 빈 문자열은 유지하고, 빈 배열은 생략해요.
stringify({ tags: ['a', 'b'], q: '', ids: [] });
// '?tags=a&tags=b&q='를 반환해요

// 결과를 경로 뒤에 붙여요. 값이 null이나 undefined인 항목은 생략해요.
`/items${stringify({ page: 1, ref: undefined })}`;
// '/items?page=1'을 반환해요

// 모든 값이 생략되면 빈 문자열을 반환하므로 경로가 그대로 유지돼요.
`/items${stringify({ ref: undefined })}`;
// '/items'를 반환해요
```

배열 안의 `null`과 `undefined`도 생략해요. 나머지 값은 `String()`으로 문자열로 변환해요.

키와 값은 `encodeURIComponent`로 인코딩해요. 공백은 `%20`으로, `+`는 `%2B`로 변환해요.

중첩된 객체나 `Date`를 값으로 전달하면 TypeScript의 타입 검사에서 에러가 발생해요. 이런 값은 `JSON.stringify()`나 `toISOString()`으로 먼저 문자열로 변환하세요.

앞의 `?`가 필요하지 않으면 결과에 `.slice(1)`을 호출하세요.

#### 파라미터

- `query` (`T`): 쿼리 문자열로 변환할 객체예요. 각 값은 문자열, 숫자, 불리언, `bigint`, `null`, `undefined` 중 하나이거나 이 값들로 이루어진 배열이어야 해요.

#### 반환 값

(`string`): `?`로 시작하는 쿼리 문자열을 반환해요. 변환할 값이 없으면 빈 문자열을 반환해요.

#### 에러

(`URIError`): 키나 값에 `'😀'.slice(0, 1)`처럼 짝이 맞지 않는 UTF-16 서로게이트가 포함되면 에러를 던져요.
