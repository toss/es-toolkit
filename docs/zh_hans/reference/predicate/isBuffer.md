# isBuffer

检查给定的值是否为 Buffer 实例。

如果该值是 Buffer，则返回 `true`，否则返回 `false`。

此函数也可以作为 TypeScript 中的类型谓词， 将参数的类型缩小为 `Buffer`。

## 签名

```typescript
function isBuffer(x: unknown): x is Buffer;
```

### 参数

- `x` (`unknown`): 要检查它是否为 Buffer 的值。

### 返回值

(`x is Buffer`): 如果 `x` 是 Buffer 则返回 `true`，否则返回 `false`。

## 示例

```typescript
const buffer = Buffer.from('test');
console.log(isBuffer(buffer)); // true

const notBuffer = 'not a buffer';
console.log(isBuffer(notBuffer)); // false
```
