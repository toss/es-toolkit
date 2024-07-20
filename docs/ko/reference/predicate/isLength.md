# isLength

주어진 값이 유효한 길이인지 확인해요.

유효한 길이란, `0` 이상 `Number.MAX_SAFE_INTEGER` 미만의 정수를 말해요. 

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `number`로 좁혀요.

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
