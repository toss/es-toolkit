# isFunction

주어진 값이 함수인지 확인해요.

`value`가 함수이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `(...args: unknown[]) => unknown`로 좁혀요.

## 인터페이스

```typescript
function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
```

### 파라미터

- `value` (`unknown`): 함수인지 확인할 값이에요.

### 반환 값

(`value is number`): 주어진 값이 함수이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isFunction } from 'es-toolkit/predicate';

console.log(isFunction(Array.prototype.slice)); // true
console.log(isFunction(async function () {})); // true
console.log(isFunction(function* () {})); // true
console.log(isFunction(Proxy)); // true
console.log(isFunction(Int8Array)); // true
```
