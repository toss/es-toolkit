# isArguments

주어진 값이 `arguments` 객체인지 확인해요.

이 함수는 주어진 값이 `arguments` 객체이면 `true`, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `IArguments`로 좁혀요.

## 인터페이스

```typescript
function isArguments(value?: unknown): value is IArguments;
```

### 파라미터

- `value` (`unknown`): `arguments` 객체인지 확인할 값이에요.

### 반환 값

(`value is IArguments`): 주어진 값이 `arguments` 객체이면 `true`, 아니면 `false`를 반환해요.

## 예시

## Examples

```typescript
import { isArguments } from 'es-toolkit/predicate';

const args = (function () {
  return arguments;
})();
const strictArgs = (function () {
  'use strict';
  return arguments;
})();
const value = [1, 2, 3];

console.log(isArguments(args)); // true
console.log(isArguments(strictArgs)); // true
onsole.log(isArguments(value)); // false
```
