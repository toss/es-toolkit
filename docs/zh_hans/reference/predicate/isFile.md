# isFile

检查给定值是否为 File 对象。

```typescript
const result = isFile(value);
```

## 用法

### `isFile(value)`

当您想确认某个值是否为 File 实例时，请使用 `isFile`。File 对象是 Web API 的一部分，表示用户上传的文件或从文件系统获取的文件。与 Blob 对象不同，它包含文件名和最后修改时间等额外信息。

```typescript
import { isFile } from 'es-toolkit/predicate';

// File 对象确认
const file = new File(['hello'], 'example.txt', { type: 'text/plain' });
console.log(isFile(file)); // true

// Blob 对象不是 File
const blob = new Blob(['hello'], { type: 'text/plain' });
console.log(isFile(blob)); // false

// 一般对象
console.log(isFile({})); // false
console.log(isFile([])); // false
console.log(isFile('text')); // false
console.log(isFile(null)); // false
console.log(isFile(undefined)); // false
```

可用于验证给定参数是否为有效文件。

```typescript
// 文件上传处理器
function handleFileUpload(input: unknown) {
  if (isFile(input)) {
    console.log(`文件名：${input.name}`);
    console.log(`文件大小：${input.size} bytes`);
    console.log(`文件类型：${input.type}`);
    console.log(`最后修改：${input.lastModified}`);

    // 确定是 File，可以安全访问文件相关属性
    return input;
  }

  throw new Error('不是有效的文件');
}
```

在不支持 `File` 的 JavaScript 执行环境中也能安全处理。

```typescript
// 在 Node.js 环境或不支持 File 的环境中也安全
console.log(isFile(new Date())); // false

// 在未定义 File 的环境中也不会发生错误
if (typeof File === 'undefined') {
  console.log(isFile({})); // false
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 File 对象的值。

#### 返回值

(`boolean`): 如果值为 File 对象则返回 `true`，否则返回 `false`。
