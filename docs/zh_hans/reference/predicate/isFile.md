# isFile

检查给定的值是否是一个`File`。

此函数测试提供的值是否是`File`的实例。 如果该值是`File`的实例，则返回`true`，否则返回`false`。

## 签名

```typescript
function isFile(x: unknown): x is File;
```

### 参数

- `x` (`unknown`): 要测试的值是否是一个`File`。

### 返回值

(`x is File`): 如果该值是一个`File`，则返回`true`，否则返回`false`。

## 示例

```typescript
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
const blob = new Blob(['content'], { type: 'text/plain' });
const value = {};

console.log(isFile(file)); // true
console.log(isFile(blob)); // false
console.log(isFile(value)); // false
```
