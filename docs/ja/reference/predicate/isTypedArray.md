# isTypedArray

与えられた値が `TypedArray` インスタンスかどうかを確認します。

```typescript
const result = isTypedArray(value);
```

## 使用法

### `isTypedArray(value)`

値が [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) インスタンスかどうかを確認したい場合は `isTypedArray` を使用してください。

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

// TypedArray インスタンス
const uint8 = new Uint8Array([1, 2, 3]);
const int16 = new Int16Array([1000, 2000]);
const float32 = new Float32Array([1.5, 2.5]);
const bigUint64 = new BigUint64Array([1n, 2n]);

console.log(isTypedArray(uint8)); // true
console.log(isTypedArray(int16)); // true
console.log(isTypedArray(float32)); // true
console.log(isTypedArray(bigUint64)); // true

// TypedArray でない値
console.log(isTypedArray([1, 2, 3])); // false (通常の配列)
console.log(isTypedArray(new ArrayBuffer(8))); // false (ArrayBuffer)
console.log(isTypedArray(new DataView(new ArrayBuffer(8)))); // false (DataView)
console.log(isTypedArray({})); // false
console.log(isTypedArray(null)); // false
console.log(isTypedArray(undefined)); // false
```

#### パラメータ

- `value` (`unknown`): TypedArray インスタンスかどうかを確認する値です。

#### 戻り値

(`value is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): 値が TypedArray インスタンスの場合は `true`、それ以外の場合は `false` を返します。
