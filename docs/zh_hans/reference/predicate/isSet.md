# isSet

检查给定值是否为 `Set`。

此函数测试提供的值是否为 `Set` 的实例。
如果值是 `Set`，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `Set`。

## 签名

```typescript
function isSet(value: unknown): value is Set<any>;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is Set<any>`): 如果值是 `Set`，则为 `true`；否则为 `false`。

## 示例

```typescript
const value1 = new Set();
const value2 = new Map();
const value3 = new WeakSet();

console.log(isSet(value1)); // true
console.log(isSet(value2)); // false
console.log(isSet(value3)); // false
```
