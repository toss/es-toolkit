# isArrayLike

주어진 값이 유사 배열인지 확인해요.

유사 배열 객체는 `null`이나 `undefined`나 함수가 아니며, `length` 프로퍼티가 유효한 길이인 객체에요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `ArrayLike<unknown>`로 좁혀요.

## 인터페이스

```typescript
function isArrayLike(value: unknown): value is ArrayLike<unknown>;
```

### 파라미터

- `value` (`unknown`): 유사 배열 객체인지 확인할 값이에요.

### 반환 값

(`value is number`): 주어진 값이 유사 배열 객체이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isArrayLike } from 'es-toolkit/predicate';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike({ 0: 'a', length: 1 })); // true
console.log(isArrayLike({})); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false
```
