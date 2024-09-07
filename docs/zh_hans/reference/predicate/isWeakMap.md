# isWeakMap

检查给定的值是否为 `WeakMap`。

此函数测试提供的值是否为 `WeakMap` 的实例。 如果值是 `WeakMap`，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `WeakMap`。

## 签名

```typescript
function isWeakMap(value: unknown): value is WeakMap<WeakKey, any>;
```

### 参数

- `value` (`unknown`): 需要测试是否为 `WeakMap` 的值。

### 返回值

(`value is WeakMap<WeakKey, any>`): 如果值是 `WeakMap`，则返回 `true`，否则返回 `false`。


## 示例

```typescript
const value1 = new WeakMap();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakMap(value1)); // true
console.log(isWeakMap(value2)); // false
console.log(isWeakMap(value3)); // false
```
