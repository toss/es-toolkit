Sure, here's the markdown document without the code blocks wrapped in triple backticks:

# isLength

주어진 값이 유효한 길이인지 확인합니다.

이 함수는 주어진 값이 `number` 타입이고 0 이상의 정수이며, JavaScript에서 안전한 최대 정수 값(`Number.MAX_SAFE_INTEGER`) 이하인지 확인합니다. 값이 유효한 길이이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 유효한 길이 타입 (`number`)으로 좁힐 수 있어요.

## Signature

```typescript
function isLength(value: unknown): value is number;
```

### Parameters

- `value` (`unknown`): 유효한 길이인지 확인할 값

### Returns

(`value is number`): 값이 유효한 길이면 `true`, 아니면 `false`.

## Examples

```typescript
import { isLength } from 'es-toolkit/predicate';

const value1 = 0;
const value2 = 42;
const value3 = -1;
const value4 = 1.5;
const value5 = Number.MAX_SAFE_INTEGER;
const value6 = Number.MAX_SAFE_INTEGER + 1;

console.log(isLength(value1)); // true
console.log(isLength(value2)); // true
console.log(isLength(value3)); // false
console.log(isLength(value4)); // false
console.log(isLength(value5)); // true
console.log(isLength(value6)); // false
```
