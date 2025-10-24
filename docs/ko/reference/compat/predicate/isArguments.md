# isArguments (Lodash 호환성)

값이 arguments 객체인지 확인해요.

```typescript
const result = isArguments(value);
```

## 레퍼런스

### `isArguments(value)`

주어진 값이 함수의 arguments 객체인지 확인할 때 `isArguments`를 사용하세요. 이 함수는 TypeScript에서 타입 가드로도 작동해서, 값의 타입을 `IArguments`로 좁혀줘요.

```typescript
import { isArguments } from 'es-toolkit/compat';

// 일반 함수에서
function normalFunction() {
  return isArguments(arguments); // true
}

// 엄격 모드에서
function strictFunction() {
  'use strict';
  return isArguments(arguments); // true
}

// arguments가 아닌 값들
isArguments([1, 2, 3]); // false
isArguments({ 0: 'a', 1: 'b', length: 2 }); // false
isArguments(null); // false
isArguments(undefined); // false

// 실제 사용 예시
function example() {
  if (isArguments(arguments)) {
    console.log('This is an arguments object');
    console.log('Length:', arguments.length);
  }
}
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 arguments 객체이면 `true`, 아니면 `false`를 반환해요.
