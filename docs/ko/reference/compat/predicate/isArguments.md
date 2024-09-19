# isArguments

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

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
console.log(isArguments(value)); // false
```
