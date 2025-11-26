# isTypedArray

检查给定值是否为 `TypedArray` 实例。

```typescript
const result = isTypedArray(value);
```

## 用法

### `isTypedArray(value)`

当您想检查值是否为 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 实例时,请使用 `isTypedArray`。

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

// TypedArray 实例
const uint8 = new Uint8Array([1, 2, 3]);
const int16 = new Int16Array([1000, 2000]);
const float32 = new Float32Array([1.5, 2.5]);
const bigUint64 = new BigUint64Array([1n, 2n]);

console.log(isTypedArray(uint8)); // true
console.log(isTypedArray(int16)); // true
console.log(isTypedArray(float32)); // true
console.log(isTypedArray(bigUint64)); // true

// 非 TypedArray 值
console.log(isTypedArray([1, 2, 3])); // false (普通数组)
console.log(isTypedArray(new ArrayBuffer(8))); // false (ArrayBuffer)
console.log(isTypedArray(new DataView(new ArrayBuffer(8)))); // false (DataView)
console.log(isTypedArray({})); // false
console.log(isTypedArray(null)); // false
console.log(isTypedArray(undefined)); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 TypedArray 实例的值。

#### 返回值

(`boolean`): 如果值是 TypedArray 实例,则返回 `true`,否则返回 `false`。
