# isArrayBuffer

检查给定值是否为 `ArrayBuffer` 实例。

```typescript
const result = isArrayBuffer(value);
```

## 用法

### `isArrayBuffer(value)`

当您想确认某个值是否为 `ArrayBuffer` 时，请使用 `isArrayBuffer`。它可以在 TypeScript 中作为类型守卫使用。

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// ArrayBuffer 实例确认
const buffer = new ArrayBuffer(16);
const notBuffer = new Array(16);

console.log(isArrayBuffer(buffer)); // true
console.log(isArrayBuffer(notBuffer)); // false

// 在处理二进制数据时很有用
const data: unknown = getDataFromAPI();
if (isArrayBuffer(data)) {
  // 在 TypeScript 中，data 类型被缩小为 ArrayBuffer
  const uint8View = new Uint8Array(data);
  console.log(`Buffer size: ${data.byteLength} bytes`);
}

// 与各种类型比较
console.log(isArrayBuffer(new ArrayBuffer(8))); // true
console.log(isArrayBuffer(new Uint8Array(8))); // false
console.log(isArrayBuffer(new DataView(new ArrayBuffer(8)))); // false
console.log(isArrayBuffer([])); // false
console.log(isArrayBuffer({})); // false
console.log(isArrayBuffer(null)); // false
console.log(isArrayBuffer(undefined)); // false
```

在文件处理或网络通信中经常使用。

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// 处理文件读取结果
async function processFileData(file: File) {
  const result = await file.arrayBuffer();

  if (isArrayBuffer(result)) {
    console.log(`文件大小：${result.byteLength} 字节`);

    // 处理二进制数据
    const view = new DataView(result);
    const header = view.getUint32(0, true);
    console.log(`文件头：${header.toString(16)}`);
  }
}

// 检查从 WebSocket 接收的数据
function handleWebSocketMessage(data: unknown) {
  if (isArrayBuffer(data)) {
    console.log('收到二进制消息');
    const bytes = new Uint8Array(data);
    // 处理字节数据
  } else if (typeof data === 'string') {
    console.log('收到文本消息');
    // 处理字符串数据
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 `ArrayBuffer` 的值。

#### 返回值

(`value is ArrayBuffer`): 如果值为 `ArrayBuffer` 则返回 `true`，否则返回 `false`。
