# isTypedArray

주어진 값이 `TypedArray` 인스턴스인지 확인해요.

```typescript
const result = isTypedArray(value);
```

## 사용법

### `isTypedArray(value)`

값이 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 인스턴스인지 확인하고 싶을 때 `isTypedArray`를 사용하세요.

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

// TypedArray 인스턴스들
const uint8 = new Uint8Array([1, 2, 3]);
const int16 = new Int16Array([1000, 2000]);
const float32 = new Float32Array([1.5, 2.5]);
const bigUint64 = new BigUint64Array([1n, 2n]);

console.log(isTypedArray(uint8)); // true
console.log(isTypedArray(int16)); // true
console.log(isTypedArray(float32)); // true
console.log(isTypedArray(bigUint64)); // true

// TypedArray가 아닌 값들
console.log(isTypedArray([1, 2, 3])); // false (일반 배열)
console.log(isTypedArray(new ArrayBuffer(8))); // false (ArrayBuffer)
console.log(isTypedArray(new DataView(new ArrayBuffer(8)))); // false (DataView)
console.log(isTypedArray({})); // false
console.log(isTypedArray(null)); // false
console.log(isTypedArray(undefined)); // false
```

#### 파라미터

- `value` (`unknown`): TypedArray 인스턴스인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 TypedArray 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
