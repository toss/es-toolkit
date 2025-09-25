# toSafeInteger (Lodash 호환성)

값을 안전한 정수로 변환해요.

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
```

## 레퍼런스

### `toSafeInteger(value?: unknown): number`

값을 안전한 정수로 변환해요. 안전한 정수는 JavaScript에서 정확하게 표현 가능한 정수로, `Number.MIN_SAFE_INTEGER`와 `Number.MAX_SAFE_INTEGER` 범위 내의 값이에요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

// 소수점이 있는 숫자 변환
toSafeInteger(3.2); // => 3
toSafeInteger(-5.6); // => -5

// 문자열 변환
toSafeInteger('3.2'); // => 3
toSafeInteger('abc'); // => 0

// 특수값 처리
toSafeInteger(NaN); // => 0
toSafeInteger(null); // => 0
toSafeInteger(undefined); // => 0

// 무한대 값 처리
toSafeInteger(Infinity); // => 9007199254740991 (Number.MAX_SAFE_INTEGER)
toSafeInteger(-Infinity); // => -9007199254740991 (Number.MIN_SAFE_INTEGER)

// 안전한 범위를 벗어나는 큰 숫자
toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
```

범위 제한과 변환 과정에서 사용할 수 있어요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

// 1. 먼저 정수로 변환 (소수점 제거)
// 2. 안전한 정수 범위로 제한
const values = [
  Number.MAX_SAFE_INTEGER + 1, // 9007199254740992
  Number.MIN_SAFE_INTEGER - 1, // -9007199254740992
  1.7976931348623157e308, // Number.MAX_VALUE
];

values.forEach(val => {
  console.log(`${val} => ${toSafeInteger(val)}`);
});
// => 9007199254740992 => 9007199254740991
// => -9007199254740992 => -9007199254740991
// => 1.7976931348623157e+308 => 9007199254740991
```

배열 인덱스나 ID 값으로 사용할 때 유용해요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

function getArrayItem(arr: any[], index: any) {
  const safeIndex = toSafeInteger(index);
  return arr[safeIndex];
}

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(getArrayItem(items, '2.7')); // => 'c' (인덱스 2)
console.log(getArrayItem(items, Infinity)); // => undefined (인덱스 9007199254740991)
```

-0 처리도 올바르게 해요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

console.log(toSafeInteger(-0)); // => -0
console.log(1 / toSafeInteger(-0)); // => -Infinity
```

#### 파라미터

- `value` (`unknown`): 변환할 값. 어떤 타입이든 받을 수 있어요.

#### 반환 값

(`number`): 변환된 안전한 정수. `Number.MIN_SAFE_INTEGER`와 `Number.MAX_SAFE_INTEGER` 범위 내의 정수 값이에요.
