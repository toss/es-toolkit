# isBrowser

检查当前环境是否为浏览器。

此函数检查`window.document`属性的存在，该属性仅存在于浏览器环境中。

## 接口

```typescript
function isBrowser(): boolean;
```

### 返回值

(`boolean`): 如果当前环境是浏览器则返回`true`，否则返回`false`。

## 示例

```typescript
if (isBrowser()) {
  console.log('这是在浏览器中运行');
  document.getElementById('app').innerHTML = '你好世界';
}
```
