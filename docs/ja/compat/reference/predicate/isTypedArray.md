# isTypedArray (Lodash 互換性)

::: warning `ArrayBuffer.isView()` または `instanceof` 演算子を使用してください

この `isTypedArray` 関数はLodash互換性のための関数ですが、単純な型確認です。

代わりにより簡単で現代的な `ArrayBuffer.isView(value)` または `value instanceof Int8Array` などを使用してください。

:::

値が型付き配列（TypedArray）かどうかを確認します。

```typescript
const result = isTypedArray(x);
```

## 使用法

### `isTypedArray(x)`

値が型付き配列かどうかを確認したい場合に `isTypedArray` を使用してください。型付き配列はバイナリデータを扱う特殊な配列型です。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 型付き配列
isTypedArray(new Uint8Array([1, 2, 3])); // true
isTypedArray(new Int16Array([1, 2, 3])); // true
isTypedArray(new Float32Array([1.1, 2.2])); // true
isTypedArray(new BigInt64Array([1n, 2n])); // true

// その他の型はfalse
isTypedArray([1, 2, 3]); // false (通常の配列)
isTypedArray(new ArrayBuffer(16)); // false (ArrayBuffer)
isTypedArray(new DataView(new ArrayBuffer(16))); // false (DataView)
isTypedArray('array'); // false (文字列)
isTypedArray({}); // false (オブジェクト)
isTypedArray(null); // false
isTypedArray(undefined); // false
```

様々な種類の型付き配列をすべて認識します。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 整数型付き配列
isTypedArray(new Int8Array()); // true
isTypedArray(new Int16Array()); // true
isTypedArray(new Int32Array()); // true
isTypedArray(new Uint8Array()); // true
isTypedArray(new Uint16Array()); // true
isTypedArray(new Uint32Array()); // true
isTypedArray(new Uint8ClampedArray()); // true

// 浮動小数点型付き配列
isTypedArray(new Float32Array()); // true
isTypedArray(new Float64Array()); // true

// BigInt型付き配列
isTypedArray(new BigInt64Array()); // true
isTypedArray(new BigUint64Array()); // true
```

型付き配列と似た他のオブジェクトと区別します。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
const typedArray = new Uint8Array(buffer);
const regularArray = [1, 2, 3, 4];

isTypedArray(buffer); // false (ArrayBuffer)
isTypedArray(view); // false (DataView)
isTypedArray(typedArray); // true (TypedArray)
isTypedArray(regularArray); // false (通常の配列)
```

バイナリデータ処理で型を区別する際に便利です。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

function processData(data: unknown) {
  if (isTypedArray(data)) {
    console.log(`型付き配列長: ${data.length}`);
    console.log(`バイト長: ${data.byteLength}`);
    console.log(`バイトオフセット: ${data.byteOffset}`);
    console.log(`コンストラクタ: ${data.constructor.name}`);

    // 最初の値を出力
    if (data.length > 0) {
      console.log(`最初の値: ${data[0]}`);
    }
  } else if (Array.isArray(data)) {
    console.log('通常の配列です');
  } else {
    console.log('配列ではありません');
  }
}

processData(new Uint8Array([1, 2, 3])); // 型付き配列情報を出力
processData([1, 2, 3]); // "通常の配列です"
processData('not an array'); // "配列ではありません"
```

#### パラメータ

- `x` (`any`): 型付き配列かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が型付き配列の場合は `true`、そうでなければ `false` を返します。
