# eq (Lodash 호환성)

::: warning `Object.is()`를 사용하세요

이 `eq` 함수는 `Object.is()`와 거의 동일한 기능을 하지만 추가적인 함수 호출 오버헤드가 발생해요.

대신 더 빠르고 표준인 `Object.is()`를 사용하세요.

:::

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

`Object.is()`와 비교:

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

배열이나 객체 비교에서의 차이점:

```typescript
import { eq } from 'es-toolkit/compat';

// 원시값은 값으로 비교
console.log(eq('hello', 'hello')); // true
console.log(eq(42, 42)); // true

// 객체는 참조로 비교
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(eq(obj1, obj2)); // false (다른 객체)
console.log(eq(obj1, obj3)); // true (같은 객체 참조)

// 배열도 마찬가지
console.log(eq([1, 2], [1, 2])); // false
console.log(eq([], [])); // false
```

특수한 값들의 비교:

```typescript
import { eq } from 'es-toolkit/compat';

// 문자열과 String 객체
console.log(eq('a', new String('a'))); // false
console.log(eq('a', Object('a'))); // false

// 숫자와 Number 객체
console.log(eq(1, new Number(1))); // false
console.log(eq(1, Object(1))); // false

// null과 undefined
console.log(eq(null, null)); // true
console.log(eq(undefined, undefined)); // true
console.log(eq(null, undefined)); // false
```

실제 사용 사례:

```typescript
import { eq } from 'es-toolkit/compat';

function findIndex(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (eq(array[i], value)) {
      return i;
    }
  }
  return -1;
}

const numbers = [1, 2, NaN, 4];
console.log(findIndex(numbers, NaN)); // 2 (NaN을 찾을 수 있음)

// === 사용 시엔 NaN을 찾을 수 없어요
console.log(numbers.indexOf(NaN)); // -1
```

#### 파라미터

- `value` (`any`): 비교할 첫 번째 값이에요.
- `other` (`any`): 비교할 두 번째 값이에요.

### 반환 값

(`boolean`): 두 값이 동등하면 `true`를, 그렇지 않으면 `false`를 반환해요.
