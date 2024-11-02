# isMap

检查给定值是否为 `Map`。

此函数测试提供的值是否为 `Map` 的实例。
如果值是 `Map`，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `Map`。

## 签名

```typescript
function isMap(value: unknown): value is Map<any, any>;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is Map<any, any>`): 如果值是 `Map`，则为 `true`；否则为 `false`。

## 示例

```typescript
const value1 = new Map();
const value2 = new Set();
const value3 = new WeakMap();

console.log(isMap(value1)); // true
console.log(isMap(value2)); // false
console.log(isMap(value3)); // false
```
