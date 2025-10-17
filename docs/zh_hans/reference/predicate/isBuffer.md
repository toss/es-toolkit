# isBuffer

检查给定值是否为 Buffer 实例。

```typescript
const result = isBuffer(value);
```

## 参考

### `isBuffer(value)`

在 Node.js 环境中想确认某个值是否为 Buffer 对象时，请使用 `isBuffer`。在文件处理、网络通信、二进制数据操作时很有用。在 TypeScript 中作为类型守卫工作，将值的类型缩小为 `Buffer`。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Buffer 实例确认
const buffer = Buffer.from('hello world', 'utf8');
isBuffer(buffer); // true

// 与其他类型区分
isBuffer('hello world'); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer(new ArrayBuffer(8)); // false
```

在 TypeScript 中作为类型守卫使用时特别有用。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

function processData(data: unknown) {
  if (isBuffer(data)) {
    // data 类型被缩小为 Buffer
    console.log(`Buffer 大小：${data.length} 字节`);
    console.log(`Buffer 内容：${data.toString('utf8')}`);

    // 可以安全地使用 Buffer 方法
    const slice = data.slice(0, 10);
  }
}
```

在文件处理或网络通信中经常使用。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// 处理文件数据
function readFileData(data: unknown) {
  if (isBuffer(data)) {
    const text = data.toString('utf8');
    const header = data.readUInt32BE(0);
    console.log('文件内容:', text);
  }
}

// 处理网络数据
function handleNetworkData(chunk: unknown) {
  if (isBuffer(chunk)) {
    console.log(`接收数据大小：${chunk.length} 字节`);
    const processed = Buffer.concat([chunk, Buffer.from('\n')]);
    return processed;
  }
  return null;
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 Buffer 实例的值。

#### 返回值

(`boolean`): 如果值为 Buffer 实例则返回 `true`，否则返回 `false`。
