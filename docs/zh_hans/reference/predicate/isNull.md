# isNull

检查给定的值是否为 null。

该函数测试提供的值是否严格相等于 `null`。

如果值为 `null`，则返回 true；否则返回 false。

在 TypeScript 中，该函数还可以作为类型谓词，将参数的类型缩小为 `null`。

## 签名

```typescript
function isNull(x: unknown): x is null;
```

### 参数

- `x` (`unknown`): 要检查是否为 null 的值

### 返回值

(`x is null`): 如果值为 null，则返回 true；否则返回 false。

## 示例

```typescript
const value1 = null;
const value2 = undefined;
const value3 = 42;

console.log(isNull(value1)); // true
console.log(isNull(value2)); // false
console.log(isNull(value3)); // false
```
