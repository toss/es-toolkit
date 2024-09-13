# isObject

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 값이 객체인지 확인해요.

객체란, `typeof` 연산의 결과가 `object`, `function` 이고 `null`이 아닌 값을 말해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `object`로 좁혀요.

## 인터페이스

```typescript
function isObject(value: unknown): value is object;
```

### 파라미터

- `value` (`unknown`): 객체인지 확인할 값.

### 반환 값

(`value is object`): 주어진 값이 객체이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isObject } from 'es-toolkit/predicate';

const value1 = {};
const value2 = [1, 2, 3];
const value3 = () => {};
const value4 = null;

console.log(isObject(value1)); // true
console.log(isObject(value2)); // true
console.log(isObject(value3)); // true
console.log(isObject(value4)); // false
```
