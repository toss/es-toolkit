# isTypedArray

检查一个值是否为 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)。

## 签名

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

### 参数

- `x` (`unknown`): 要检查的值。

### 返回值

(`x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): 如果值是 `TypedArray`，则为 `true`，否则为 `false`。

## 示例

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

const arr = new Uint8Array([1, 2, 3]);
isTypedArray(arr); // true

const regularArray = [1, 2, 3];
isTypedArray(regularArray); // false

const buffer = new ArrayBuffer(16);
isTypedArray(buffer); // false
```
