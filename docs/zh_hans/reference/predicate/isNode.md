# isNode

检查当前运行环境是否为 Node.js。

```typescript
const result = isNode();
```

## 参考

### `isNode()`

当您想检查当前代码是否在 Node.js 环境中运行时，请使用 `isNode`。在使用 Node.js 特定的 API 之前验证环境时非常有用。

```typescript
import { isNode } from 'es-toolkit/predicate';

if (isNode()) {
  // Node.js 特定代码
  console.log('此代码在 Node.js 中运行');
  const fs = await import('node:fs');
  const path = await import('node:path');
} else {
  // 仅浏览器代码
  console.log('此代码在浏览器中运行');
  const response = await fetch('/api/data');
}
```

在有条件地使用 Node.js 模块时也很有用：

```typescript
function getEnvironmentInfo() {
  if (isNode()) {
    return {
      platform: process.platform,
      nodeVersion: process.version,
      environment: 'Node.js'
    };
  } else {
    return {
      userAgent: navigator.userAgent,
      environment: 'Browser'
    };
  }
}
```

#### 返回值

(`boolean`): 如果当前环境为 Node.js，则返回 `true`，否则返回 `false`。
