# isBlob

检查给定值是否为 Blob 实例。

```typescript
const result = isBlob(value);
```

## 用法

### `isBlob(value)`

当您想确认某个值是否为 Blob 实例时，请使用 `isBlob`。在浏览器环境中处理文件或二进制数据时很有用。

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 基本 Blob 实例
const blob = new Blob(['hello'], { type: 'text/plain' });
const file = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(blob)); // true
console.log(isBlob(file)); // true (File 继承自 Blob)

// 非 Blob 值
console.log(isBlob(new ArrayBuffer(8))); // false
console.log(isBlob('text data')); // false
console.log(isBlob({})); // false
console.log(isBlob(null)); // false
```

在文件处理或 API 响应验证中很有用。

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 处理上传的文件
function processUploadedFile(file: unknown) {
  if (isBlob(file)) {
    // TypeScript 将 file 推断为 Blob
    console.log(`文件大小：${file.size} 字节`);
    console.log(`MIME 类型：${file.type}`);

    // 安全地使用 Blob 方法
    file.text().then(text => console.log('内容:', text));
  } else {
    console.log('无效的文件');
  }
}

// 实现下载功能
async function handleDownload(data: unknown, filename: string) {
  if (isBlob(data)) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 Blob 实例的值。

#### 返回值

(`value is Blob`): 如果值为 Blob 实例则返回 `true`，否则返回 `false`。
