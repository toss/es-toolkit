# isArrayLike

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 값이 유사 배열인지 확인해요.

유사 배열 객체는 `null`이나 `undefined`나 함수가 아니며, `length` 프로퍼티가 유효한 길이인 객체에요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `ArrayLike<unknown>`로 좁혀요.

## 인터페이스

```typescript
function isArrayLike(value?: unknown): value is ArrayLike<unknown>;
```

### 파라미터

- `value` (`unknown`): 유사 배열 객체인지 확인할 값이에요.

### 반환 값

(`value is ArrayLike<unknown>`): 주어진 값이 유사 배열 객체이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isArrayLike } from 'es-toolkit/compat';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike({ 0: 'a', length: 1 })); // true
console.log(isArrayLike({})); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false
```
