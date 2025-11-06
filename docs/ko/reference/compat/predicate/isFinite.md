# isFinite (Lodash 호환성)

::: warning `Number.isFinite`를 사용하세요

이 `isFinite` 함수는 추가적인 타입 체크 오버헤드로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Number.isFinite`를 사용하세요.

:::

값이 유한한 숫자인지 확인해요.

```typescript
const result = isFinite(value);
```

## 사용법

### `isFinite(value)`

주어진 값이 유한한 숫자인지 확인할 때 `isFinite`를 사용하세요. 이 함수는 TypeScript에서 타입 가드로도 작동해서, 값의 타입을 `number`로 좁혀줘요.

```typescript
import { isFinite } from 'es-toolkit/compat';

// 유한한 숫자들
isFinite(100); // true
isFinite(-50); // true
isFinite(3.14); // true
isFinite(0); // true

// 무한대는 false
isFinite(Infinity); // false
isFinite(-Infinity); // false

// NaN도 false
isFinite(NaN); // false

// 다른 타입들도 false
isFinite('100'); // false
isFinite([]); // false
isFinite({}); // false
isFinite(null); // false
isFinite(undefined); // false
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 유한한 숫자이면 `true`, 아니면 `false`를 반환해요.
