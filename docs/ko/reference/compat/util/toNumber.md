# toNumber (Lodash 호환성)

::: warning `Number()` 함수를 사용하세요

이 `toNumber` 함수는 Symbol 타입 검사로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Number()` 함수를 사용하세요.

:::

값을 숫자로 변환해요.

```typescript
const result = toNumber(value);
```

## 레퍼런스

### `toNumber(value)`

다양한 타입의 값을 숫자로 변환하고 싶을 때 `toNumber`를 사용하세요. `Number()` 함수와 거의 동일하지만, Symbol 값에 대해서는 `NaN`을 반환해요.

```typescript
import { toNumber } from 'es-toolkit/compat';

// 기본적인 숫자 변환
toNumber(3.2); // 3.2
toNumber('3.2'); // 3.2
toNumber(true); // 1
toNumber(false); // 0
```

특수한 값들도 처리할 수 있어요.

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Number.MIN_VALUE); // 5e-324
toNumber(Infinity); // Infinity
toNumber(-Infinity); // -Infinity
toNumber(NaN); // NaN
```

Symbol 값은 `NaN`으로 변환돼요.

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Symbol.iterator); // NaN
toNumber(Symbol('custom')); // NaN

// Number() 함수와의 차이점
Number(Symbol.iterator); // TypeError 발생
toNumber(Symbol.iterator); // NaN (안전하게 처리)
```

#### 파라미터

- `value` (`unknown`): 숫자로 변환할 값이에요.

### 반환 값

(`number`): 변환된 숫자 값을 반환해요. Symbol인 경우 `NaN`을 반환해요.
