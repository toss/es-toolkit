# isString (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요

이 `isString` 함수는 String 객체 래퍼 처리로 인해 복잡해요.

대신 더 간단하고 현대적인 `typeof value === 'string'`을 사용하세요.

:::

값이 문자열인지 확인해요.

```typescript
const result = isString(value);
```

## 레퍼런스

### `isString(value)`

값이 문자열인지 타입 안전하게 확인하고 싶을 때 `isString`을 사용하세요. 원시 문자열과 String 객체 래퍼 둘 다 확인해요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isString } from 'es-toolkit/compat';

// 원시 문자열
isString('hello'); // true
isString(''); // true
isString('123'); // true

// String 객체 래퍼
isString(new String('hello')); // true
isString(new String('')); // true

// 다른 타입들은 false
isString(123); // false
isString(true); // false
isString(null); // false
isString(undefined); // false
isString({}); // false
isString([]); // false
isString(Symbol('test')); // false
```

문자열과 비슷해 보이는 다른 타입들과 구분해요.

```typescript
import { isString } from 'es-toolkit/compat';

// 문자열 vs 숫자
isString('123'); // true
isString(123); // false

// 문자열 vs 불린
isString('true'); // true
isString(true); // false

// 문자열 vs null/undefined
isString('null'); // true
isString(null); // false
isString('undefined'); // true
isString(undefined); // false
```

#### 파라미터

- `value` (`unknown`): 문자열인지 확인할 값이에요.

### 반환 값

(`value is string`): 값이 문자열이면 `true`, 아니면 `false`를 반환해요.
