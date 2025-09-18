# isFunction (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요
이 `isFunction` 함수는 Lodash 호환성을 위해 제공되지만, 내부적으로 `typeof value === 'function'`을 사용해요.

대신 더 직접적인 `typeof value === 'function'` 또는 `es-toolkit`의 [isFunction](../../predicate/isFunction.md)를 사용하세요.
:::

값이 함수인지 확인해요.

```typescript
const result = isFunction(value);
```

## 레퍼런스

### `isFunction(value)`

값이 함수인지 타입 안전하게 확인하고 싶을 때 `isFunction`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isFunction } from 'es-toolkit/compat';

// 일반 함수
isFunction(function () {}); // true
isFunction(() => {}); // true

// 내장 함수와 생성자
isFunction(Array.prototype.slice); // true
isFunction(Proxy); // true
isFunction(Int8Array); // true

// 비동기 함수와 제너레이터 함수
isFunction(async function () {}); // true
isFunction(function* () {}); // true

// 다른 타입들은 false
isFunction('function'); // false
isFunction({}); // false
isFunction([]); // false
isFunction(null); // false
isFunction(undefined); // false
isFunction(123); // false
```

#### 파라미터

- `value` (`unknown`): 함수인지 확인할 값이에요.

### 반환 값

(`value is (...args: any[]) => any`): 값이 함수이면 `true`, 아니면 `false`를 반환해요.
