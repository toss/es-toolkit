# isInteger (Lodash 호환성)

::: warning `Number.isInteger`를 사용하세요

이 `isInteger` 함수는 추가적인 타입 체크 오버헤드로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Number.isInteger`를 사용하세요.

:::

값이 정수인지 확인해요.

```typescript
const result = isInteger(value);
```

## 레퍼런스

### `isInteger(value)`

주어진 값이 정수인지 확인할 때 `isInteger`를 사용하세요. 이 함수는 TypeScript에서 타입 가드로도 작동해서, 값의 타입을 `number`로 좁혀줘요.

```typescript
import { isInteger } from 'es-toolkit/compat';

// 정수 값 확인
isInteger(3); // true
isInteger(-5); // true
isInteger(0); // true

// 소수 값은 false
isInteger(3.14); // false
isInteger(-2.5); // false

// 무한대는 false
isInteger(Infinity); // false
isInteger(-Infinity); // false

// 다른 타입들도 false
isInteger('3'); // false
isInteger([]); // false
isInteger({}); // false
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 정수이면 `true`, 아니면 `false`를 반환해요.
