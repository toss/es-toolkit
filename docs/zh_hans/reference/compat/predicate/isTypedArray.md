# isTypedArray (Lodash 兼容性)

::: warning 使用 `ArrayBuffer.isView()` 或 `instanceof` 运算符
这个 `isTypedArray` 函数是 Lodash 兼容性的函数，但是简单的类型检查。

请使用更简单且现代的 `ArrayBuffer.isView(value)` 或 `value instanceof Int8Array` 等。
:::

检查值是否为类型数组(TypedArray)。

```typescript
const result = isTypedArray(x);
```

## 参考

### `isTypedArray(x)`

当您想检查值是否为类型数组时使用 `isTypedArray`。类型数组是处理二进制数据的特殊数组类型。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 类型数组
isTypedArray(new Uint8Array([1, 2, 3])); // true
isTypedArray(new Int16Array([1, 2, 3])); // true
isTypedArray(new Float32Array([1.1, 2.2])); // true
isTypedArray(new BigInt64Array([1n, 2n])); // true

// 其他类型返回 false
isTypedArray([1, 2, 3]); // false (普通数组)
isTypedArray(new ArrayBuffer(16)); // false (ArrayBuffer)
isTypedArray(new DataView(new ArrayBuffer(16))); // false (DataView)
isTypedArray('array'); // false (字符串)
isTypedArray({}); // false (对象)
isTypedArray(null); // false
isTypedArray(undefined); // false
```

识别各种类型的类型数组。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 整数类型数组
isTypedArray(new Int8Array()); // true
isTypedArray(new Int16Array()); // true
isTypedArray(new Int32Array()); // true
isTypedArray(new Uint8Array()); // true
isTypedArray(new Uint16Array()); // true
isTypedArray(new Uint32Array()); // true
isTypedArray(new Uint8ClampedArray()); // true

// 浮点类型数组
isTypedArray(new Float32Array()); // true
isTypedArray(new Float64Array()); // true

// BigInt 类型数组
isTypedArray(new BigInt64Array()); // true
isTypedArray(new BigUint64Array()); // true
```

与类似类型数组的其他对象进行区分。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
const typedArray = new Uint8Array(buffer);
const regularArray = [1, 2, 3, 4];

isTypedArray(buffer); // false (ArrayBuffer)
isTypedArray(view); // false (DataView)
isTypedArray(typedArray); // true (TypedArray)
isTypedArray(regularArray); // false (普通数组)
```

在二进制数据处理中区分类型时很有用。

```typescript
import { isTypedArray } from 'es-toolkit/compat';

function processData(data: unknown) {
  if (isTypedArray(data)) {
    console.log(`类型数组长度: ${data.length}`);
    console.log(`字节长度: ${data.byteLength}`);
    console.log(`字节偏移: ${data.byteOffset}`);
    console.log(`构造函数: ${data.constructor.name}`);

    // 输出第一个值
    if (data.length > 0) {
      console.log(`第一个值: ${data[0]}`);
    }
  } else if (Array.isArray(data)) {
    console.log('这是普通数组');
  } else {
    console.log('这不是数组');
  }
}

processData(new Uint8Array([1, 2, 3])); // 输出类型数组信息
processData([1, 2, 3]); // "这是普通数组"
processData('not an array'); // "这不是数组"
```

#### 参数

- `x` (`any`): 要检查是否为类型数组的值。

#### 返回值

(`boolean`): 如果值为类型数组则返回 `true`，否则返回 `false`。
