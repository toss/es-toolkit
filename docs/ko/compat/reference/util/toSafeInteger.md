# toSafeInteger (Lodash 호환성)

값을 안전한 정수로 변환해요.

```typescript
const result = toSafeInteger(value);
```

## 사용법

### `toSafeInteger(value)`

값을 안전한 정수로 변환하고 싶을 때 `toSafeInteger`를 사용하세요. 안전한 정수는 JavaScript에서 정확하게 표현 가능한 정수로, `Number.MIN_SAFE_INTEGER`와 `Number.MAX_SAFE_INTEGER` 범위 내의 값이에요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(3.2);
// Returns: 3

toSafeInteger(Infinity);
// Returns: 9007199254740991

toSafeInteger('3.2');
// Returns: 3

// 문자열 변환
toSafeInteger('abc');
// Returns: 0

// 특수값 처리
toSafeInteger(NaN);
// Returns: 0

toSafeInteger(null);
// Returns: 0

toSafeInteger(undefined);
// Returns: 0
```

무한대 값도 안전한 범위로 제한해요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

toSafeInteger(-Infinity);
// Returns: -9007199254740991 (Number.MIN_SAFE_INTEGER)

toSafeInteger(Number.MAX_VALUE);
// Returns: 9007199254740991
```

배열 인덱스나 ID 값으로 사용할 때 유용해요.

```typescript
import { toSafeInteger } from 'es-toolkit/compat';

function getArrayItem(arr: any[], index: any) {
  const safeIndex = toSafeInteger(index);
  return arr[safeIndex];
}

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(getArrayItem(items, '2.7')); // 'c' (인덱스 2)
console.log(getArrayItem(items, Infinity)); // undefined (범위를 벗어남)
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

#### 반환 값

(`number`): 변환된 안전한 정수를 반환해요.
