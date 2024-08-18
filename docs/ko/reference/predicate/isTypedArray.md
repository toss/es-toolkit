# isTypedArray

값이 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)인지 확인해요.

## 인터페이스

```typescript
function isTypedArray(
  x: unknown
): x is
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | BigUint64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigInt64Array
  | Float32Array
  | Float64Array;
```

### 파라미터

- `x` (`unknown`): 확인할 값.

### 반환 값

(`x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): 값이 TypedArray이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

const arr = new Uint8Array([1, 2, 3]);
isTypedArray(arr); // true

const regularArray = [1, 2, 3];
isTypedArray(regularArray); // false

const buffer = new ArrayBuffer(16);
isTypedArray(buffer); // false
```
