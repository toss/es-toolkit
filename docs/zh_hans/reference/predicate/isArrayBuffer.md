# isArrayBuffer

检查给定值是否是`ArrayBuffer`。

此函数还可以在TypeScript中用作类型谓词，将参数的类型缩小为`ArrayBuffer`。

## 签名

```typescript
function isArrayBuffer(value: unknown): value is ArrayBuffer;
```

### 参数

- `value` (`unknown`): 检查是否为`ArrayBuffer`的值。

### 返回值

(`value is ArrayBuffer`): 如果`value`是`ArrayBuffer`，返回`true`，否则返回`false`。

## 示例

```typescript
const value1 = new ArrayBuffer();
const value2 = new Array();
const value3 = new Map();

console.log(isArrayBuffer(value1)); // true
console.log(isArrayBuffer(value2)); // false
console.log(isArrayBuffer(value3)); // false
```
