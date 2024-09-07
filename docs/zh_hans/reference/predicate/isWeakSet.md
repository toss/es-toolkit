# isWeakSet

检查给定的值是否为 `WeakSet`。

此函数测试提供的值是否为 `WeakSet` 的实例。 如果值是 `WeakSet`，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `WeakSet`。

## 签名

```typescript
function isWeakSet(value: unknown): value is WeakSet<WeakKey>;
```

### 参数

- `value` (`unknown`): 需要测试是否为 `WeakSet` 的值。

### 返回值

(`value is WeakSet<WeakKey>`): 如果值是 `WeakSet`，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = new WeakSet();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakSet(value1)); // true
console.log(isWeakSet(value2)); // false
console.log(isWeakSet(value3)); // false
```
