# stringifySearch

객체로 URL 뒤에 붙일 쿼리 문자열을 만들어요. 결과는 `?a=1&b=2`처럼 `?`로 시작해요.

```typescript
const search = stringifySearch(query);
```

## 사용법

### `stringifySearch(query)`

URL에 쿼리 파라미터를 붙여야 할 때 `stringifySearch`를 사용하세요. 결과가 `?`로 시작하기 때문에 경로 뒤에 바로 이어 붙이면 돼요.

```typescript
import { stringifySearch } from 'es-toolkit/util';

// 객체로 쿼리 문자열을 만들어요.
stringifySearch({ page: 1, q: 'hello world' });
// '?page=1&q=hello%20world'를 반환해요

// 배열은 같은 키를 반복해서 넣어요. 빈 문자열은 그대로 두고, 빈 배열은 넣지 않아요.
stringifySearch({ tags: ['a', 'b'], q: '', ids: [] });
// '?tags=a&tags=b&q='를 반환해요

// 경로 뒤에 붙여요. 값이 `null`이나 `undefined`인 키는 넣지 않아요.
`/items${stringifySearch({ page: 1, ref: undefined })}`;
// '/items?page=1'을 반환해요

// 넣을 값이 하나도 없으면 경로가 그대로 남아요.
`/items${stringifySearch({ ref: undefined })}`;
// '/items'를 반환해요
```

키와 값은 `encodeURIComponent`로 인코딩해요. 공백은 `%20`, `+`는 `%2B`로 바뀌어서 결과를 `URLSearchParams`로 읽어도, `decodeURIComponent`로 읽어도 같은 값이 나와요.

값으로 객체나 `Date`를 넣으면 타입 에러가 나요. `JSON.stringify()`나 `toISOString()`으로 먼저 문자열로 바꿔서 넣어 주세요.

앞의 `?` 없이 쿼리 부분만 필요하면 결과에 `.slice(1)`을 호출하세요.

#### 파라미터

- `query` (`T`): 쿼리 문자열로 만들 객체. 값은 문자열, 숫자, 불리언, `BigInt`, `null`, `undefined` 중 하나이거나 이 값들의 배열이어야 해요.

#### 반환 값

(`string`): `?`로 시작하는 쿼리 문자열. 넣을 값이 없으면 빈 문자열이에요.

#### 에러

(`URIError`): `'😀'.slice(0, 1)`처럼 반으로 잘린 문자가 키나 값에 있으면 에러가 발생해요.
