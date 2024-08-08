# isBoolean

检查给定值是否为布尔值。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `boolean`。

## 签名

```typescript
function isBoolean(x: unknown): x is boolean;
```

### 参数

- `x` (`unknown`): 要测试是否为布尔值的值。

### 返回值

(`x is boolean`): 如果该值是布尔值，则为真；否则为假。

## 示例

```typescript
const value1 = true;
const value2 = 0;
const value3 = 'abc';

console.log(isBoolean(value1)); // true
console.log(isBoolean(value2)); // false
console.log(isBoolean(value3)); // false
```
