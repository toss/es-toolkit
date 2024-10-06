# isBlob

检查给定的值是否是一个Blob。

此函数测试提供的值是否是`Blob`的实例。
如果该值是`Blob`的实例，则返回`true`，否则返回`false`。

## 签名

```typescript
function isBlob(x: unknown): x is Blob;
```

### 参数

- `x` (`unknown`): 要测试的值是否是一个Blob。

### 返回值

(`x is Blob`): 如果该值是一个Blob，则为 `true`，否则为 `false`。

## 示例

```typescript
const value1 = new Blob();
const value2 = {};

console.log(isBlob(value1)); // true
console.log(isBlob(value2)); // false
```
