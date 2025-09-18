# isUndefined

주어진 값이 `undefined`인지 확인해요.

```typescript
const result = isUndefined(value);
```

## 레퍼런스

### `isUndefined(value)`

값이 `undefined`인지 확인하고 싶을 때 `isUndefined`를 사용하세요. 변수의 초기화 여부나 선택적 프로퍼티의 존재 여부를 확인할 때 유용해요.

```typescript
import { isUndefined } from 'es-toolkit/predicate';

// undefined 값들
console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true

let uninitialized: string;
console.log(isUndefined(uninitialized)); // true

// undefined가 아닌 값들
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(0)); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false
```

#### 파라미터

- `value` (`unknown`): undefined인지 확인할 값이에요.

#### 반환 값

(`value is undefined`): 값이 undefined이면 `true`, 그렇지 않으면 `false`를 반환해요.
