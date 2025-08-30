# isString

检查给定的值是否是一个字符串。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `string`。

## 签名

```typescript
function isString(value: unknown): value is string;
```

### 参数

- `value`(`unknown`): 要测试是否为字符串的值。

### 返回值

(`value is string`): 如果值是字符串，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = 'abc';
const value2 = 123;
const value3 = true;

console.log(isString(value1)); // true
console.log(isString(value2)); // false
console.log(isString(value3)); // false
```
