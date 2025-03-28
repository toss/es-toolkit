# isNode

检查当前环境是否为Node.js。

此函数检查`process.versions.node`属性的存在，该属性仅存在于Node.js环境中。

## 接口

```typescript
function isNode(): boolean;
```

### 返回值

(`boolean`): 如果当前环境是Node.js则返回`true`，否则返回`false`。

## 示例

```typescript
if (isNode()) {
  console.log('这是在 Node.js 中运行');
  const fs = import('node:fs');
}
```
