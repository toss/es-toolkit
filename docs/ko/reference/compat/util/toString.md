# toString (Lodash 호환성)

::: warning `String()` 함수를 사용하세요

이 `toString` 함수는 복잡한 null/undefined 처리와 Symbol 변환로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `String()` 함수를 사용하세요.

:::

값을 문자열로 변환해요.

```typescript
const result = toString(value);
```

## 레퍼런스

### `toString(value)`

다양한 타입의 값을 문자열로 변환하고 싶을 때 `toString`을 사용하세요. `null`과 `undefined`는 빈 문자열로, `-0`의 부호는 유지해서 변환해요.

```typescript
import { toString } from 'es-toolkit/compat';

// 기본적인 문자열 변환
toString(123); // '123'
toString(true); // 'true'
toString(false); // 'false'
```

`null`과 `undefined`는 빈 문자열로 변환돼요.

```typescript
import { toString } from 'es-toolkit/compat';

toString(null); // ''
toString(undefined); // ''

// String() 함수와의 차이점
String(null); // 'null'
String(undefined); // 'undefined'
```

특수한 숫자 값들도 올바르게 처리해요.

```typescript
import { toString } from 'es-toolkit/compat';

toString(-0); // '-0' (부호 유지)
toString(Infinity); // 'Infinity'
toString(-Infinity); // '-Infinity'
```

배열과 Symbol도 처리할 수 있어요.

```typescript
import { toString } from 'es-toolkit/compat';

toString([1, 2, -0]); // '1,2,-0'
toString([Symbol('a'), Symbol('b')]); // 'Symbol(a),Symbol(b)'
```

#### 파라미터

- `value` (`unknown`): 문자열로 변환할 값이에요.

### 반환 값

(`string`): 변환된 문자열을 반환해요. `null`이나 `undefined`인 경우 빈 문자열을 반환해요.
