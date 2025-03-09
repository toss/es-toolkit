# isJSON

주어진 값이 유효한 JSON 문자열인지 확인해요.

유효한 JSON 문자열은 `JSON.parse()`를 사용하여 성공적으로 파싱할 수 있는 문자열이에요. JSON 명세에 따르면, 유효한 JSON은 다음을 표현할 수 있어요:

- 객체 (문자열 키와 유효한 JSON 값을 가진)
- 배열 (유효한 JSON 값을 포함하는)
- 문자열
- 숫자
- 불리언
- `null`

`"null"`, `"true"`, `"false"`와 같은 문자열 값과 숫자 문자열(예: `"42"`)도 유효한 JSON으로 간주되어 `true`를 반환해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `string`으로 좁혀요.

## 인터페이스

```typescript
function isJSON(value: unknown): value is string;
```

### 파라미터

- `value` (`unknown`): 유효한 JSON 문자열인지 확인할 값.

### 반환 값

`value is string`: 값이 유효한 JSON 문자열이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isJSON } from 'es-toolkit/predicate';

const value1 = '{"name":"John","age":30}';
const value2 = '[1,2,3]';
const value3 = 'true';
const value4 = 'null';
const value5 = '42';
const value6 = 'invalid json';
const value7 = { name: 'John' };
const value8 = null;

console.log(isJSON(value1)); // true
console.log(isJSON(value2)); // true
console.log(isJSON(value3)); // true (JSON 명세에 따라 불리언으로 파싱됨)
console.log(isJSON(value4)); // true (JSON 명세에 따라 null로 파싱됨)
console.log(isJSON(value5)); // true (JSON 명세에 따라 숫자로 파싱됨)
console.log(isJSON(value6)); // false
console.log(isJSON(value7)); // false (문자열이 아님)
console.log(isJSON(value8)); // false (문자열이 아님)
```
