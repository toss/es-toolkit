# isSafeInteger (Lodash 호환성)

::: warning `Number.isSafeInteger`를 사용하세요

이 `isSafeInteger` 함수는 추가적인 타입 체크 오버헤드로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Number.isSafeInteger`를 사용하세요.

:::

값이 안전한 정수인지 확인해요.

```typescript
const result = isSafeInteger(value);
```

## 사용법

### `isSafeInteger(value)`

주어진 값이 안전한 정수인지 확인할 때 `isSafeInteger`를 사용하세요. 안전한 정수는 -(2^53 - 1)과 (2^53 - 1) 사이의 정수로, JavaScript에서 정확하게 표현할 수 있는 정수예요.

```typescript
import { isSafeInteger } from 'es-toolkit/compat';

// 안전한 정수들
isSafeInteger(3); // true
isSafeInteger(-42); // true
isSafeInteger(0); // true
isSafeInteger(Number.MAX_SAFE_INTEGER); // true (9007199254740991)
isSafeInteger(Number.MIN_SAFE_INTEGER); // true (-9007199254740991)

// 안전하지 않은 정수들
isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
isSafeInteger(9007199254740992); // false

// 정수가 아닌 값들
isSafeInteger(3.14); // false
isSafeInteger('3'); // false
isSafeInteger(1n); // false (BigInt)
isSafeInteger([]); // false
isSafeInteger({}); // false
isSafeInteger(null); // false
isSafeInteger(undefined); // false

// 무한대와 NaN
isSafeInteger(Infinity); // false
isSafeInteger(-Infinity); // false
isSafeInteger(NaN); // false
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`value is number`): 값이 안전한 정수이면 `true`, 아니면 `false`를 반환해요.  
`true`를 반환할 때, TypeScript는 `value`의 타입을 `number`로 좁혀요.

> 🧠 **TypeScript 참고:**  
> 이 함수는 **타입 가드**로 동작해요. 즉, `true`를 반환할 때  
> TypeScript는 인자 타입을 `number`로 좁혀요.
