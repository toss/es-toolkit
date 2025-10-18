# eq (Lodash 호환성)

두 값이 SameValueZero 비교 방식으로 동등한지 확인해요.

```typescript
const isEqual = eq(value, other);
```

## 레퍼런스

### `eq(value, other)`

두 값이 동등한지 확인하고 싶을 때 `eq`를 사용하세요. 일반적인 `===` 비교와 달리 `NaN`끼리의 비교에서 `true`를 반환해요.

```typescript
import { eq } from 'es-toolkit/compat';

// 기본 사용법
console.log(eq(1, 1)); // true
console.log(eq(0, -0)); // true (SameValueZero에서는 0과 -0을 같다고 봄)
console.log(eq(NaN, NaN)); // true
console.log(eq('a', 'a')); // true
console.log(eq('a', 'b')); // false
```

`Object.is()`와 다르게 동작해요.

```typescript
// eq 사용
console.log(eq(NaN, NaN)); // true
console.log(eq(0, -0)); // true

// Object.is 사용 (더 빠름)
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false (Object.is는 0과 -0을 다르다고 봄)

// === 사용
console.log(NaN === NaN); // false
console.log(0 === -0); // true
```

#### 파라미터

- `value` (`any`): 비교할 첫 번째 값이에요.
- `other` (`any`): 비교할 두 번째 값이에요.

#### 반환 값

(`boolean`): 두 값이 동등하면 `true`를, 그렇지 않으면 `false`를 반환해요.
