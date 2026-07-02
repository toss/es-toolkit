# safeJSONParse

에러를 던지지 않고 JSON 문자열을 안전하게 파싱해요.

```typescript
const result = safeJSONParse(value);
```

## 사용법

### `safeJSONParse(value)`

JSON 문자열을 안전하게 파싱하고 싶을 때 `safeJSONParse`를 사용하세요. `JSON.parse` 예외를 발생시킬 위험 없이 파싱할 수 있어요. 값이 유효한 JSON을 포함한 문자열이면 파싱된 결과를 반환하고, 그렇지 않으면 `safeJSONParse`는 `null`을 반환해요.

사용자 입력, 느슨하게 타입이 지정된 데이터, 또는 값이 항상 유효한 JSON 문자열이라는 보장이 없는 신뢰할 수 없는 소스를 다룰 때 특히 유용해요.

```typescript
import { safeJSONParse } from 'es-toolkit/util';

// 유효한 JSON 문자열들
safeJSONParse('{"name":"JinHo","age":29}'); // { name: "JinHo", age: 29 }
safeJSONParse('[1, 2, 3]'); // [1, 2, 3]
safeJSONParse('"hello world"'); // "hello world"
safeJSONParse('42'); // 42
safeJSONParse('true'); // true
safeJSONParse('false'); // false
safeJSONParse('null'); // null (유효한 JSON이지만 파싱된 값이 null)

// 유효하지 않은 JSON 문자열들
safeJSONParse('invalid json'); // null
safeJSONParse('{"unclosed": "object"'); // null
safeJSONParse('[1,2,'); // null
safeJSONParse('undefined'); // null
safeJSONParse(''); // null

// 문자열이 아닌 값들
safeJSONParse({ name: 'JinHo' }); // null
safeJSONParse([1, 2, 3]); // null
safeJSONParse(42); // null
safeJSONParse(true); // null
safeJSONParse(null); // null
safeJSONParse(undefined); // null
```

### 제네릭을 사용한 타입 안전한 파싱

제네릭 파라미터 `T`를 사용해서 파싱된 JSON 값의 예상 형태를 설명할 수 있어요:

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

const raw = '{"id":1,"name":"JinHo","isAdmin":false}';

const user = safeJSONParse<User>(raw);
// user: User | null

if (user !== null) {
  // user는 여기서 User로 타입이 좁혀져요
  console.log(user.id); // number
  console.log(user.name); // string
  console.log(user.isAdmin); // boolean
}
```

타입 인자를 제공하지 않으면 반환 타입은 기본적으로 `unknown | null`이에요:

```typescript
const result = safeJSONParse('{"name": "JinHo"}');
// result: unknown | null
```

`safeJSONParse`를 자신만의 타입 가드(예: `isJSONObject`, `isJSONValue`)와 함께 사용해서 파싱된 구조를 더 검증할 수 있어요.

### isJSON과 함께 사용하기

`safeJSONParse`는 `isJSON` 타입 가드를 보완하도록 설계되었어요:

- 값이 유효한 JSON 문자열인지 확인만 하려면 `isJSON(value)`를 사용하세요.
- JSON 문자열을 실제로 파싱하고 결과를 사용하고 싶을 때는 `safeJSONParse(value)`를 사용하세요.

```typescript
import { isJSON } from 'es-toolkit/predicate';
import { safeJSONParse } from 'es-toolkit/util';

function parseIfJson(input: unknown) {
  if (!isJSON(input)) {
    // input은 유효한 JSON 문자열이 아니에요
    return null;
  }

  // input은 이제 string 타입으로 좁혀져요
  const parsed = safeJSONParse(input);

  // parsed는 JSON 값(또는 예상치 못한 일이 발생하면 null)이에요
  return parsed;
}
```

### 실용적인 예시

#### API 응답 파싱

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type ApiResponse = {
  success: boolean;
  payload?: unknown;
};

function handleApiResponse(responseBody: unknown) {
  const data = safeJSONParse<ApiResponse>(responseBody);

  if (data === null) {
    return {
      success: false,
      error: '응답 본문이 유효한 JSON이 아니에요',
    };
  }

  if (!data.success) {
    return {
      success: false,
      error: 'API가 실패를 보고했어요',
    };
  }

  return {
    success: true,
    payload: data.payload,
  };
}
```

#### 사용자 입력 파싱

```typescript
import { safeJSONParse } from 'es-toolkit/util';

function tryParseUserConfig(input: unknown) {
  const config = safeJSONParse<Record<string, unknown>>(input);

  if (config === null) {
    return {
      isValid: false,
      config: null,
      error: '입력이 유효한 JSON이 아니에요',
    };
  }

  return {
    isValid: true,
    config,
    error: null,
  };
}
```

::: info "null" 문자열에 대한 참고

입력이 문자열 `"null"`일 때, `safeJSONParse("null")`은 실제 파싱된 값이기 때문에 `null`을 반환해요. 이것은 순수하게 반환 값만으로는 파싱 실패와 구별할 수 없어요. 두 경우를 구별해야 한다면 `isJSON`과 `safeJSONParse`를 함께 사용하거나 커스텀 결과 타입을 도입하세요.

:::

#### 파라미터

- `value` (`unknown`): JSON으로 파싱할 값이에요.

#### 반환 값

(`T | null`): `value`가 유효한 JSON을 포함한 문자열이면 파싱된 JSON 값, 그렇지 않으면 `null`이에요.
