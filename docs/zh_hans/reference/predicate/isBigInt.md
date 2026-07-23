# isBigInt

检查给定的值是否为 bigint。

此函数也可作为 TypeScript 中的类型谓词，将参数类型收窄为 `bigint`。

## 签名

```typescript
function isBigInt(x: unknown): x is bigint;
```

### 参数

- `x` (`unknown`): 要测试是否为 bigint 的值。

### 返回值

(`x is bigint`): 如果该值是 bigint，则为 true；否则为 false。

## 示例

```typescript
const value1 = 0n;
const value2 = 0;
const value3 = '123';

console.log(isBigInt(value1)); // true
console.log(isBigInt(value2)); // false
console.log(isBigInt(value3)); // false
```
